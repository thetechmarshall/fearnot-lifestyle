import React, { FC } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import SocialMedia from "./SocialMedia";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { CATEGORIES_QUERYResult } from "@/sanity.types";
import LogoWhite from "./LogoWhite";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CATEGORIES_QUERYResult;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, onClose, categories }) => {
  const pathname = usePathname();
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 bg-darkColor/50 shadow-xl hoverEffect w-full ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-darkColor text-white/70 h-full p-8 border-r border-r-white flex flex-col gap-6"
      >
        <div className="flex justify-between items-center">
          <button onClick={onClose}>
            <LogoWhite className="text-white text-xl">FearNot Lifestyle</LogoWhite>
          </button>
          <button className="hover:text-red-500 hoverEffect" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-3.5 text-base font-semibold tracking-wide">
          <Link
            href={"/"}
            onClick={onClose}
            className={`hover:text-white hoverEffect relative group ${pathname === "/" && "text-white"}`}
          >
            Home
            <span
              className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === "/" && "w-1/2"}`}
            ></span>
            <span
              className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-darkColor hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === "/" && "w-1/2"}`}
            ></span>
          </Link>

          {categories?.map((category) => (
            <Link
              onClick={onClose}
              key={category?.title}
              href={`/category/${category?.slug?.current}`}
              className={`hover:text-white hoverEffect w-24 ${pathname === `/category/${category?.slug?.current}` && "text-white"}`}
            >
              {category?.title}
            </Link>
          ))}
        </div>
        <SocialMedia />
      </motion.div>
    </div>
  );
};

export default Sidebar;
