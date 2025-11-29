"use client";
import Image from "next/image";

export default function FeaturedProjects() {
  return (
    <section className="cus_container py-20  px-[20px] py-[30px] md:px-0 md:py-20 bg-white">
      
      {/* Heading */}
      <div className="md:mb-12 mb-6">
        <p className="uppercase text-[11.6px] text-secondary tracking-[0.15em] mb-3">
          Referenzprojekt
        </p>
        <h2 className="text-3xl mt-2 font-light">Ausgewählte Projekte</h2>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8">

        {/* Project 1 */}
        <div>
          <div className="w-full h-[450px] relative">
            <Image
              src="/images/article-1st.png"
              alt="The Serenity of Beauty"
              fill
              className="object-cover md:grayscale md:hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="mt-[5px] pt-[5px] flex flex-col gap-[1px] border-t border-gray-400/22 md:pt-7.5 md:gap-[10px] md:mt-6">
            <p className="uppercase text-[11.6px] text-secondary tracking-[0.15em] md:mb-3 mb-1">
              Residential
            </p>
            <h3 className="text-base md:text-xl  text-[#000]  uppercase tracking-wider">THE SERENITY OF BEAUTY</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs mx-0 ">
              Obuxne, MForm, HufHausch  
              <br />
              Photography: Stephanie Matthias
            </p>
          </div>
        </div>

        {/* Project 2 */}
        <div>
          <div className="w-full h-[450px] relative">
            <Image
              src="/images/article-home-2.png"
              alt="Timeless Elegance by the Sea"
              fill
              className="object-cover md:grayscale md:hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="mt-[5px] pt-[5px] flex flex-col gap-[1px] border-t border-gray-400/22 md:pt-7.5 md:gap-[10px] md:mt-6">
            <p className="uppercase text-[11.6px] text-secondary tracking-[0.15em] mb-3">
              Projektreferenz
            </p>
            <h3 className="text-base md:text-xl  text-[#000]  uppercase tracking-wider">Timeless Elegance by the Sea</h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xs mx-0 ">
              Obuxne, MForm, Glenn Sestig  
              <br />
              Photography: Stephanie Matthias
            </p>
          </div>
        </div>

      </div>

      <div className="text-center mt-16">
        <button className="uppercase tracking-[0.15em] px-6 py-2 bg-transparent text-black border border-black rounded-none hover:bg-black hover:text-white transition-all cursor-pointer text-[12px]">
          Alle Projekte ansehen
        </button>
      </div>

    </section>
  );
}
