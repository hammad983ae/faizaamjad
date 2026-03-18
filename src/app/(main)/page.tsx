import Hero from "@/components/Hero";
import NewArrivals from "@/components/NewArrivals";
import TopPicks from "@/components/TopPicks";
import EmbroideryFeature from "@/components/EmbroideryFeature";
import CategoryBanners from "@/components/CategoryBanners";
import WeddingEdit from "@/components/WeddingEdit";
import Heritage from "@/components/Heritage";
import InstagramGrid from "@/components/InstagramGrid";

export default function Home() {
  return (
    <main className="flex flex-col overflow-x-hidden">
      <Hero />
      <NewArrivals />
      <TopPicks />
      <EmbroideryFeature />
      <CategoryBanners />
      <WeddingEdit />
      <Heritage />
      <InstagramGrid />
    </main>
  );
}
