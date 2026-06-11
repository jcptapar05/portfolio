import Slider from "@/components/_pages/home/slider/Slider";
import SkillsCarousel from "@/components/_pages/skills/SkillsCarousel";
import HomeContact from "@/components/_pages/home/HomeContact";

export default function Home() {
  return (
    <>
      <Slider />
      <SkillsCarousel />
      <HomeContact />
    </>
  );
}
