import { z } from "zod";

export const formSchema = z.object({
  jumlah: z
    .number({
      required_error: "Jumlah tidak boleh kosong",
      invalid_type_error: "Jumlah harus berupa angka",
    })
    .min(1, { message: "Jumlah harus lebih dari 0" })
    .max(34, { message: "Jumlah tidak boleh lebih dari 34" }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
