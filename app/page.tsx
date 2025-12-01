import Image from "next/image";
import Banner from "./Components/Banner"
import Productlist from "./Components/Productlist";
import DoubleFeaturedSection from "./Components/DoubleFeaturedSection";
import UmfassendeBetreuung from "./Components/UmfassendeBetreuung";
import Footer from "./Components/footer";
import FeaturedProjects from "./Components/FeaturedProjects";
export default function Home() {
  return (
    <div>
      <Banner />
       <Productlist is_our_products={false}/>
      <DoubleFeaturedSection is_our_products={undefined} />
     <FeaturedProjects/>
      { <UmfassendeBetreuung /> }
    </div>
  );
}
