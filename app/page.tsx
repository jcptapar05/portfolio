import About from "@/components/About";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Works from "@/components/Works";
import Image from "next/image";

export default function Home() {
 return (
  <>
   <Banner></Banner>
   <About></About>
   <Works></Works>
   <Contact></Contact>
   <Footer></Footer>
  </>
 );
}
