"use client";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import usericon from "../../public/icons/user.svg";
import menuicon from "../../public/icons/menuicon.svg";
import crossicon from "../../public/icons/crossicon.svg";
const navigationMenu = [
  {
    id: 1,
    pagename: "STARTSEITE",
    pagelink: "/",
  },
  {
    id: 2,
    pagename: "MARKEN",
    pagelink: "/marken",
  },
  {
    id: 3,
    pagename: "PRODUKTE",
    pagelink: "/produkte",
  },
  {
    id: 4,
    pagename: "PROJEKTE",
    pagelink: "/projekte",
  },
  {
    id: 5,
    pagename: "WISSEN",
    pagelink: "/wissen",
  },
  {
    id: 6,
    pagename: "NEWS",
    pagelink: "/news",
  },
  {
    id: 7,
    pagename: "ÜBER UNS",
    pagelink: "/ueber-uns",
  },
  {
    id: 8,
    pagename: "KONTAKT",
    pagelink: "/kontakt",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentPath = usePathname();
  return (
    <div className="fixed w-full top-0 z-[100] bg-white">
      <div className="cus_container flex justify-center py-4 md:py-8 relative z-[50] bg-white">
        <Link href="/">
          <div className="cursor-pointer">
            <h4 className="uppercase text-[10.5px] text-black pb-0.5 tracking-[0.2em]">
              BUREAU KERSTEN ZÜRICH
            </h4>
            <p className="text-[6.5px] md:text-[7.8px] text-secondary uppercase tracking-[0.25em]">
              CURATED · BESPOKE · INTERIOR MATERIALS
            </p>
          </div>
        </Link>
        <div className="flex items-center justify-end xl:justify-center w-[70%] 2xl:w-[80%] gap-5">
          <ul className=" gap-6 2xl:gap-6 hidden xl:flex">
            {navigationMenu.map((data, index) => (
              <Link key={index} href={data.pagelink}>
                <li
                  className={`uppercase text-[10px] 2xl:text-[11.6px] tracking-[0.2em]  ${
                    currentPath === data.pagelink
                      ? "text-black"
                      : "text-ternary"
                  }`}
                >
                  {data.pagename}
                </li>
              </Link>
            ))}
          </ul>

          <div className="hidden md:flex  gap-4">
            {["DE", "EN", "FR"].map((lang, index) => (
              <span
                key={index}
                className="uppercase text-[10px] 2xl:text-[11.6px] text-ternary"
              >
                {lang}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 tracking-[0.2em]">
            <button className="uppercase text-[10px] 2xl:text-[11.6px] text-black flex items-center gap-2 py-1.5 px-3 border border-black rounded-[3px]">
              <Image
                src={usericon}
                alt="user icon"
                width={1000}
                height={500}
                className="max-w-3"
              />
              b2b login
            </button>
            <div
              className="flex xl:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Image
                src={isMenuOpen ? crossicon : menuicon}
                alt="menu icon"
                width={1000}
                height={500}
                className="max-w-[30px]"
              />
            </div>
          </div>
        </div>

        {/* Mobile navbar */}
        <div
          className={`absolute    bg-white  md:top-[103px] cus_container transition-all duration-300 ${
            isMenuOpen ? "top-[82px] scale-[1.0] top-[85px] md:top-[103px] lg:top-[94px] w-full h-[100vh] right-0" : " !top-[85px] w-full h-[0px] !right-0 overflow-hidden"
          }`}
        >
          <ul className="gap-6 2xl:gap-12 flex flex-col items-end px-6 pt-6">
            {navigationMenu.map((data, index) => (
              <Link key={index} href={data.pagelink}>
                <li
                  className={`uppercase text-[10px] 2xl:text-[11.6px]  ${
                    currentPath === data.pagelink
                      ? "text-black"
                      : "text-ternary"
                  }`}
                >
                  {data.pagename}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex md:hidden justify-end gap-4 px-6 mt-6">
            {["DE", "EN", "FR"].map((lang, index) => (
              <span
                key={index}
                className="uppercase text-[10px] 2xl:text-[11.6px] text-ternary"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
