import { Form } from "@/components/Form";
import { Navbar } from "@/components/Navbar";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-[100px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Selamat Datang di Aplikasi
          </h1>
          <h2>Provinsi dan Kabupaten di Indonesia</h2>
          <Form />
        </div>
      </div>
    </>
  );
};

export default HomePage;
