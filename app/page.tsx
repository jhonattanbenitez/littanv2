import BannerDiscount from "@/components/BannerDiscount";
import BannerProduct from "@/components/BannerProduct";
import CarouselText from "@/components/CarouselText";
import ChooseCategory from "@/components/ChooseCategory";
import FeaturedProduct from "@/components/FeaturedProduct";

export default function Home() {
  return (
    <main className="">
      <CarouselText />
      <FeaturedProduct />
      <BannerDiscount />
      <ChooseCategory />
      <BannerProduct />
    </main>
  );
}
