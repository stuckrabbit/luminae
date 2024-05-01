import '../src/app/globals.css';
import '../src/app/fonts.css';
import HeaderTemplate from "../src/app/shared/HeaderTemplate";
import StoreInteractionContainer from "../src/app/shared/ProductCategoriesManager";
import MainBanner from "../src/app/home/MainBanner";
import FlashSaleLayout from "../src/app/home/FlashSaleLayout";
import TrendingProductsLayout from "../src/app/home/TrendingProductsLayout";
import ProductsDisplayLayout from "../src/app/home/ProductsDisplayLayout";
import CategoryCardsLayout from "../src/app/home/CategoryCardsLayout";
import AdvertisementLayout from "../src/app/home/AdvertisementLayout";
import FeaturedCategoriesLayout from "../src/app/home/FeaturedCategoriesLayout";
import FooterTemplate from "../src/app/shared/FooterTemplate";
import EmailSubscribeSection from '../src/app/shared/EmailSubscribeSection';

function Home() {
  return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
      <MainBanner/>
      <FlashSaleLayout/>
      <TrendingProductsLayout/>
      <ProductsDisplayLayout/>
      <CategoryCardsLayout/>
      <AdvertisementLayout/>
      <FeaturedCategoriesLayout/>
      <FooterTemplate/>
  </>
  );
}

export default Home;