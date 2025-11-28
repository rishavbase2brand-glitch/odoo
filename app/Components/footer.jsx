"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white ">
      <div className="cus_container py-20 ">
        {/* Top Section */}
        <div className="text-center md:mb-20 lg:mb-20 mb-2">
          <p className="text-sm tracking-widest text-gray-400 mb-4">KONTAKT</p>
          <h2 className="text-3xl md:text-4xl font-light mb-8">
            Lassen Sie uns über Ihr Projekt sprechen
          </h2>

          <button className="border border-gray-500 px-6 py-3 uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-all">
            Kontakt aufnehmen
          </button>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 border-b border-gray-700 pt-10 pb-10">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider mb-3">
              BUREAU KERSTEN ZÜRICH
            </h3>
            <p className="text-[11px] text-gray-400 mb-6 tracking-wider">
              CURATED – BESPOKE – INTERIOR MATERIALS
            </p>

            <p className="text-sm text-gray-300 leading-relaxed">
              Limmatstrasse 256
              <br />
              8005 Zürich
            </p>

            <p className="text-sm mt-4">+41 44 591 99 55</p>
            <p className="text-sm text-gray-300">info@bureaukersten.com</p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider mb-4 text-[#999999]">
              NAVIGATION
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Produkte
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Wissen
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Über Uns
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 (Right Part) */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider md:mb-8 mb-0 lg:mb-8   text-[#999999]"></h3>
            <ul className="space-y-2 text-sm text-gray-300 mt-0 md:mt-0">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Marken
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Projekte
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider mb-4 text-[#999999]">
              FOLGEN SIE UNS
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pinterest
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-sm tracking-wider mb-4 text-[#999999]">
              SHOWROOM
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Besuch nur nach
              <br />
              Vereinbarung
            </p>
          </div>
        </div>
        <div className="pt-5 flex justify-between items-center text-sm">
          {/* Left Side */}
          <div className="text-[11px] font-medium text-[#666666]">© 2025 Bureau Kersten. Alle Rechte vorbehalten.</div>

          {/* Right Side */}
          <div className="flex space-x-6">
            <a href="/datenschutz" className="hover:text-white text-[11px] font-medium text-[#666666]">
              Datenschutz
            </a>
            <a href="/impressum" className="hover:text-white text-[11px] font-medium text-[#666666]">
              Impressum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
