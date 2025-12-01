"use client";
import Image from "next/image";

export default function FeaturedProjects() {
  return (
    <section className="cus_container py-20  px-[20px] py-[30px] md:px-0 md:py-20 bg-white">
      {/* Heading */}
      <div className="md:mb-12 mb-6">
        <p className="uppercase text-[9.625px]  tracking-[0.15em] md:mb-3 mb-2 text-[#999999]">
          Referenzprojekt
        </p>
        <h2 className="main_title">Ausgewählte Projekte</h2>
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
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="mt-[5px] pt-[5px] flex flex-col gap-[1px] border-t border-gray-400/22 md:pt-7.5 md:gap-[10px] md:mt-6">
            <p className="uppercase text-[9.256px]  tracking-[0.15em] md:mb-3 mb-2 text-[#999999]">
              Residential
            </p>
            <h3 className="text-[15.5px] md:[15.75px]  text-[#000]  uppercase tracking-wider font-light">
              THE SERENITY OF BEAUTY
            </h3>
            <p className="uppercase text-[11.375px]  tracking-[0.15em] md:mb-3 mb-2 text-[#999999]">
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
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="mt-[5px] pt-[5px] flex flex-col gap-[1px] border-t border-gray-400/22 md:pt-7.5 md:gap-[10px] md:mt-6">
            <p className="uppercase text-[9.625px]  tracking-[0.15em] md:mb-3 mb-1 text-[#999999]">
              Projektreferenz
            </p>
            <h3 className="text-[15.5px] md:[15.75px]  text-[#000]  uppercase tracking-wider font-light">
              Timeless Elegance by the Sea
            </h3>
            <p className="uppercase text-[11.375px]  tracking-[0.15em] md:mb-3 mb-2 text-[#999999]">
              Obuxne, MForm, Glenn Sestig
              <br />
              Photography: Stephanie Matthias
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button className="uppercase text-[9.625px] tracking-[0.15em] px-6 py-2 bg-transparent text-black border border-black rounded-none hover:bg-black hover:text-white transition-all cursor-pointer md:mt-3 mt-0">
          Alle Projekte ansehen
        </button>
      </div>
    </section>
  );
}
