import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNavbar";
import Theme from "./LightDarkTheme";
import UserAvatar from "./UserAvatar";
import GlobalSearch from "./GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between background-light800_dark200 fixed z-50 w-full gap-5 p-6 sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <p className="h2-bold text-dark-100 dark:text-light-900 max-sm:hidden">
          Code <span className="text-primary-500">Overflow</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <UserAvatar />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
