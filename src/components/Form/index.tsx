"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ProvincesProps, RegencyProps } from "@/types";
import axios from "axios";
import { formSchema } from "@/zod/schema";
import { ZodError } from "zod";

export const Form = () => {
  const [provinces, setProvinces] = useState<ProvincesProps[]>([]);
  const [regencies, setRegencies] = useState<RegencyProps[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<ProvincesProps[]>(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
      )
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Gagal fetch provinsi:", error);
        setError("Gagal fetch provinsi");
      });
  }, []);

  const handleProvinceClick = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    axios
      .get<RegencyProps[]>(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
      )
      .then((res) => setRegencies(res.data))
      .catch((err) => console.error("Gagal fetch kabupaten:", err));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const parsed = formSchema.parse({ jumlah: Number(inputValue) });
      setDisplayCount(parsed.jumlah);
      setSelectedProvinceId(null);
      setRegencies([]);
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message); // tampilkan pesan error pertama
      } else {
        console.error("Unexpected error:", err);
        setError("Terjadi kesalahan");
      }
    }
  };

  return (
    <form className="mt-[50px] w-[300px]">
      <div className="flex flex-row items-center justify-baseline gap-2">
        <Input
          type="number"
          placeholder="Masukkan Provinsi 1-34"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" onClick={handleSubmit} disabled={!inputValue}>
          Submit
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      <div className="flex flex-row items-start justify-center gap-2 mt-4">
        {displayCount > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Provinsi:</h2>
            <ul className="list-disc pl-10 bg-red-300 p-4 rounded-md w-auto lg:w-[250px]">
              {provinces.slice(0, displayCount).map((province) => (
                <li
                  key={province.id}
                  onClick={() => handleProvinceClick(province.id)}
                  className="cursor-pointer hover:underline"
                >
                  {province.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedProvinceId && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">Kabupaten:</h2>
            <ul className="list-disc pl-10 bg-red-300 p-4 rounded-md lg:w-[250px]">
              {regencies.map((regency) => (
                <li key={regency.id}>{regency.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </form>
  );
};
