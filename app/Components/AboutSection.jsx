import Image from "next/image";
export default function AboutSection() {
  return (
    <section className="cus_container py-20 bg-[#fafafa]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
      {/* LEFT IMAGE */}
      <div>
        <img 
          src="/images/about-image.png"     
          alt="Founder Portrait" 
          className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex flex-col justify-center">
        <p className="text-xs tracking-widest mb-2 text-[#999999] md:mb-6 mb-0">DER GRÜNDER</p>

        <h2 className="text-3xl mt-2 font-light mb-6">
          Über Bureau Kersten
        </h2>

        <div className="space-y-5 text-gray-700 leading-relaxed">

          <p>
            Was inspiriert unsere ausschließliche Hingabe zu belgischem Design?
          </p>

          <p>
           Die Wahrheit ist einfach und doch tiefgründig: Bureau Kersten entstand aus tiefer Bewunderung für eine oft übersehene Facette belgischer Kultur. Jenseits von Schokolade und Waffeln – so geschätzt sie auch sind – liegt ein subtileres, dauerhafteres Vermächtnis.
          </p>

          <p>
           Was mich fesselte, war das belgische Ethos, das jedes Handwerk durchdringt – von der Gastronomie über Mode bis zur handwerklichen Produktion. Es ist eine stille Integrität, eine bewusste Zurückhaltung, die das Überflüssige zugunsten dessen meidet, was wirklich wertvoll ist. Sie kennen vielleicht jenen seltenen Moment, wenn ein Objekt oder Raum Ihre Aufmerksamkeit nicht durch Prunk, sondern durch die Reinheit seiner Materialien und die Ehrlichkeit seiner Konstruktion fesselt. Das ist das Markenzeichen belgischer Handwerkskunst: Schöpfungen, die nicht aus dem Wunsch zu blenden entstehen, sondern aus einem unerschütterlichen Streben nach Exzellenz.
          </p>

          <p>
            Ich habe Generationen belgischer Handwerker kennengelernt – Familien, die Techniken bewahrt und perfektioniert haben, die anderswo längst vergessen oder zugunsten von Zweckmäßigkeit aufgegeben wurden. Ihre Arbeit verkörpert eine ethische Hingabe, die zunehmend selten wird. Sie verstehen, dass natürliche Materialien, wenn sie respektiert und geschickt bearbeitet werden, keine künstliche Verschönerung brauchen, um das Gewöhnliche zu transzendieren.
          </p>

          <p>
            Diese Philosophie ist das Fundament von Bureau Kersten. Wir kuratieren Belgiens exquisiteste Innenausbau-Materialien durch direkte Partnerschaften mit den angesehensten Manufakturen des Landes – nicht um Exklusivität um ihrer selbst willen zu pflegen, sondern weil wir glauben, dass anspruchsvolle Architekten direkten Zugang zu authentischer Handwerkskunst verdienen. Unsere Kollektion ist Zeugnis der Kraft kompromissloser Zusammenarbeit mit Unternehmen, deren handwerkliche Meisterschaft belgische Designexzellenz über Generationen hinweg definiert hat.
          </p>
           <p>
           Sie spiegelt eine unverwechselbare belgische Sensibilität wider: zurückhaltende Eleganz, außergewöhnliche Qualität und akribische Detailgenauigkeit, die belgischen Interieurs weltweite Anerkennung eingebracht hat. Für Projekte, die mehr als konventionellen Luxus verlangen, wo authentisches belgisches Erbe und echte Werte im Mittelpunkt stehen, bietet Bureau Kersten Zugang zu Materialien und Expertise, die selten anderswo zu finden sind.
          </p>

        </div>

        <p className="mt-6 pt-4  font-semibold border-t border-gray-400/22">Kersten</p>
        <p className="text-sm text-gray-500 pt-4 ">
          Gründer & Kurator, Bureau Kersten
        </p>
      </div>
    </div>
    </section>
  );
}
