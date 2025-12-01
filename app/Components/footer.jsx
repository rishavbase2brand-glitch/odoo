"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [openSection, setOpenSection] = useState("");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const navigationLinks = [
    { name: "Startseite", href: "#" },
    { name: "Produkte", href: "#" },
    { name: "Wissen", href: "#" },
    { name: "Über Uns", href: "#" },
    { name: "Marken", href: "#" },
    { name: "Projekte", href: "#" },
    { name: "News", href: "#" },
    { name: "Kontakt", href: "#" },
  ];

  const followLinks = [
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Pinterest", href: "#" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="cus_container px-[20px] py-[40px] md:px-0 md:py-20">
        {/* Top Section */}
        <div className="text-center md:mb-20 mb-2">
          <p className="text-sm tracking-widest text-gray-400 mb-4">KONTAKT</p>
          <h2 className="text-3xl md:text-4xl font-light mb-8">
            Lassen Sie uns über Ihr Projekt sprechen
          </h2>
          <button className="border border-gray-500 px-6 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all">
            Kontakt aufnehmen
          </button>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] md:gap-12 border-b border-gray-700 pt-10 pb-10">
          {/* Column 1 (Address) */}
          <div>
            <h3 className="font-semibold text-[13px] tracking-wider mb-3">
              BUREAU KERSTEN ZÜRICH
            </h3>
            <p className="text-[13px] text-gray-400 mb-6 tracking-wider">
              CURATED – BESPOKE – INTERIOR MATERIALS
            </p>
            <p className="text-[13px] text-gray-300 leading-relaxed">
              Limmatstrasse 256
              <br />
              8005 Zürich
            </p>
           <p className="text-sm mt-4">
  <Link href="tel:+41445919955" className="hover:text-white transition-colors">
    +41 44 591 99 55
  </Link>
</p>

<p className="text-sm text-gray-300 mt-2">
  <Link href="mailto:info@bureaukersten.com" className="hover:text-white transition-colors">
    info@bureaukersten.com
  </Link>
</p>
          </div>

          {/* NAVIGATION Column */}
          <div className="md:text-inherit md:rounded-none md:bg-transparent md:px-0 md:py-0">
            {/* Mobile Collapsible */}
            <div className="text-white rounded-[10px] bg-[#6a728273] px-2.5 py-[17px] flex flex-col md:hidden mt-5 md:mt-0">
              <div
                className="flex justify-between items-center cursor-pointer font-semibold text-[16px] tracking-wider mb-1"
                onClick={() => toggleSection("navigation")}
              >
                <span>NAVIGATION</span>
                <span
                  className={`ml-2 inline-block w-3 h-3 border-r-2 border-b-2 border-gray-400 transform transition-transform duration-300 ${
                    openSection === "navigation" ? "rotate-45" : "-rotate-45"
                  }`}
                ></span>
              </div>
              <ul
                className={`space-y-2  text-gray-300 transition-all duration-300 overflow-hidden ${
                  openSection === "navigation" ? "max-h-96" : "max-h-0"
                }`}
              >
                {navigationLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop Title + Grid */}
            <div className="hidden md:block">
              <h3 className="font-semibold text-sm tracking-wider mb-4 text-[#999999]">
                NAVIGATION
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 md:gap-x-[31px]">
                {navigationLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="hover:text-white transition-colors block"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* FOLGEN SIE UNS Column */}
          <div className="md:text-inherit md:rounded-none md:bg-transparent md:px-0 md:py-0">
            {/* Mobile Collapsible */}
            <div className="text-white rounded-[10px] bg-[#6a728273] px-2.5 py-[17px] flex flex-col md:hidden ">
              <div
                className="flex justify-between items-center cursor-pointer font-semibold text-[16px] tracking-wider mb-1"
                onClick={() => toggleSection("follow")}
              >
                <span>FOLGEN SIE UNS</span>
                <span
                  className={`ml-2 inline-block w-3 h-3 border-r-2 border-b-2 border-gray-400 transform transition-transform duration-300 ${
                    openSection === "follow" ? "rotate-45" : "-rotate-45"
                  }`}
                ></span>
              </div>
              <ul
                className={`space-y-2 text-sm text-gray-300 transition-all duration-300 overflow-hidden ${
                  openSection === "follow" ? "max-h-96" : "max-h-0"
                }`}
              >
                {followLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <h3 className="font-semibold text-sm tracking-wider mb-4 text-[#999999]">
                FOLGEN SIE UNS
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {followLinks.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SHOWROOM Column */}
          <div className="md:text-inherit md:rounded-none md:bg-transparent md:px-0 md:py-0">
            {/* Mobile Collapsible */}
            <div className="text-white rounded-[10px] bg-[#6a728273] px-2.5 py-[17px] flex flex-col md:hidden ">
              <div
                className="flex justify-between items-center cursor-pointer font-semibold text-[16px] tracking-wider mb-1"
                onClick={() => toggleSection("showroom")}
              >
                <span>AUSSTELLUNGSRAUM</span>
                <span
                  className={`ml-2 inline-block w-3 h-3 border-r-2 border-b-2 border-gray-400 transform transition-transform duration-300 ${
                    openSection === "showroom" ? "rotate-45" : "-rotate-45"
                  }`}
                ></span>
              </div>
              <p
                className={`text-[13px] text-gray-300 leading-relaxed transition-all duration-300 overflow-hidden ${
                  openSection === "showroom" ? "max-h-40" : "max-h-0"
                }`}
              >
                Besuch nur nach
                <br />
                Vereinbarung
              </p>
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <h3 className="font-semibold text-sm tracking-wider mb-4 text-[#999999]">
                AUSSTELLUNGSRAUM
              </h3>
              <p className="text-[13px] text-gray-300 leading-relaxed">
                Besuch nur nach
                <br />
                Vereinbarung
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-5 flex flex-wrap justify-center gap-2.5 md:justify-between md:flex-nowrap md:gap-0 text-sm">
          <div className="text-[11px] font-medium text-[#666666]">
            © 2025 Bureau Kersten. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-6">
            <a
              href="/datenschutz"
              className="hover:text-white text-[11px] font-medium text-[#666666]"
            >
              Datenschutz
            </a>
            <a
              href="/impressum"
              className="hover:text-white text-[11px] font-medium text-[#666666]"
            >
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
