import React from "react";
import HeaderMenu from "./HeaderMenu";
import Container from "./Container";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import Carticon from "./Carticon";
import { getAllCategories, } from "@/sanity/helpers/queries";
import LogoDark from "./LogoDark";
import HeaderAuth from "./HeaderAuth"; 
import Wishlist from "./Wishlist";

const Header = async () => {
  const categories = await getAllCategories();

  return (
    <header className="bg-white border-b border-gray-400 py-5 sticky top-0 z-50">
      <Container className="flex items-center justify-between gap-7 text-lightColor">
        <div className="w-auto md:w-[40%] flex items-center justify-start gap-1.5">
          <MobileMenu categories={categories} />
          <LogoDark>fearnot lifestyle</LogoDark>
        </div>
        <HeaderMenu categories={categories} />
        <div className="w-auto md:w-1/3 flex items-center justify-end gap-3 md:gap-4">
          <SearchBar />
          <Carticon />
          <Wishlist />
          <HeaderAuth /> 
        </div>
      </Container>
    </header>
  );
};

export default Header;
