import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FinishProvider } from "@/components/FinishContext";
import Hero from "@/components/sections/Hero";
import Specs from "@/components/sections/Specs";
import NightPanel from "@/components/sections/NightPanel";
import Cejm from "@/components/sections/Cejm";
import Order from "@/components/sections/Order";

export default function Page() {
  return (
    <FinishProvider>
      <Nav />
      <main>
        <Hero />
        <Specs />
        <NightPanel />
        <Cejm />
        <Order />
      </main>
      <Footer />
    </FinishProvider>
  );
}
