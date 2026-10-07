import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SoldListing from "@/components/SoldListing/SoldListing";
import { getSoldProperties } from "@/data/propertySelectors";

export const metadata: Metadata = {
  title: "Propiedades vendidas",
  description:
    "Proyectos entregados en el área metropolitana de Bucaramanga. Consulta información general de las propiedades vendidas, respetando la privacidad de sus propietarios.",
  alternates: { canonical: "/vendidas" },
  openGraph: { url: "/vendidas" },
};

export default function SoldPropertiesPage() {
  return (
    <main>
      <Header />
      <SoldListing
        eyebrow="Experiencia comprobada"
        title="Propiedades vendidas"
        description="Una selección reservada de proyectos entregados, presentada con información general y respetando la privacidad de sus propietarios."
        properties={getSoldProperties()}
      />
      <Footer />
    </main>
  );
}
