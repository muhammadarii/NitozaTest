"use client";
import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { MenuBar } from "./menuBar";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">Nitoza</div>
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? (
              <IoCloseSharp className="w-6 h-6" />
            ) : (
              <GiHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden"
          >
            <MenuBar />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
