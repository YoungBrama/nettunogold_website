import { Hero } from "@/components/sections/Hero";
import { ProssimiTornei } from "@/components/sections/ProssimiTornei";
import { ClubIntro } from "@/components/sections/ClubIntro";
import { ServiziPreview } from "@/components/sections/ServiziPreview";
import { ContattiMappa } from "@/components/sections/ContattiMappa";

export default function Home() {
  return (
    <>
      <Hero />
      <ProssimiTornei />
      <ClubIntro />
      <ServiziPreview />
      <ContattiMappa />
    </>
  );
}
