import Link from "next/link";

export const MenuBar = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <Link href="/" className="hover:text-red-300">
        Home
      </Link>
      <Link href="/about" className="hover:text-red-300">
        About
      </Link>
      <Link href="/contact" className="hover:text-red-300 pb-4">
        Contact
      </Link>
    </div>
  );
};
