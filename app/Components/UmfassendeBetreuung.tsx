// components/UmfassendeBetreuung.tsx

import { BookOpen, FileText, Wrench } from 'lucide-react';

export default function UmfassendeBetreuung() {
  return (
    <section className="w-full bg-white  md:py-24 lg:py-15">
      <div className="cus_container py-20 ">
        {/* Heading */}
        <div className=" mb-4">
          <p className="uppercase text-[11.6px] text-secondary tracking-[0.15em] mb-3">
            Unser Service für Professionelle
          </p>
          <h2 className="main_title  text-gray-900 leading-tight">
            Umfassende Betreuung
          </h2>
        </div>

        {/* Divider Line */}
        <div className="flex justify-center mt-2 md:mt-20 lg:mt-20">
          {/* <div className="w-full max-w-4xl h-px bg-gray-200"></div> */}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Card 1 */}
          <div className=" group border-t border-[#e8e8e8] md:pt-[55px] lg:pt-[55px] pt-0">
            <div className="inline-flex items-center gap-1 justify-center p-5 bg-gray-50 rounded-full mb-4  transition-all duration-300 pl-0">
            
              <BookOpen className="w-5 h-5 md:w-5 md:h-5 text-[#cccccc]" />
              <h3 className="text-[18px]  text-[#000] uppercase tracking-wider">
              Musterbibliothek
            </h3>
            </div>

            

            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs mx-0 mb-8">
              Physische Materialmuster für fundierte Projektentscheidungen. Professioneller Service exklusiv für Architekten und Planer.
            </p>

            <button className="text-gray-700 hover:text-black font-medium uppercase tracking-wider text-sm md:text-base transition-colors cursor-pointer">
              Mehr erfahren →
            </button>
          </div>

          {/* Card 2 */}
          <div className=" group border-t border-[#e8e8e8] md:pt-[55px] lg:pt-[55px] pt-0">
            <div className="inline-flex items-center gap-1 justify-center p-5 bg-gray-50 rounded-full mb-4  transition-all duration-300 pl-0">
              <FileText className="w-5 h-5 md:w-5 md:h-5 text-[#cccccc]" />
              
            <h3 className="text-[18px]  text-[#000] uppercase tracking-wider">
              Wissensbibliothek
            </h3>
            </div>


            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs mx-0 mb-8">
              Umfassende technische Dokumentation, Pflegeanleitungen und Anwendungsbeispiele für professionelle Projekte.
            </p>

            <button className="text-gray-700 hover:text-black font-medium uppercase tracking-wider text-sm md:text-base transition-colors cursor-pointer">
              Mehr erfahren →
            </button>
          </div>

          {/* Card 3 */}
          <div className=" group border-t border-[#e8e8e8] md:pt-[55px] lg:pt-[55px] pt-0">
            <div className="inline-flex items-center gap-1   justify-center p-5 bg-gray-50 rounded-full mb-4  transition-all duration-300 pl-0">
              <Wrench className="w-5 h-5 md:w-5 md:h-5 text-[#cccccc]" />
               <h3 className="text-[18px]  text-[#000] uppercase tracking-wider">
              Fachhandwerker
            </h3>
            </div>

           

            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs mx-0 mb-8">
              Geprüftes Netzwerk qualifizierter Installationsbetriebe für professionelle Umsetzung.
            </p>

            <button className="text-gray-700 hover:text-black font-medium uppercase tracking-wider text-sm md:text-base transition-colors cursor-pointer">
              Mehr erfahren →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}