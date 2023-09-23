
import ProductHero from "./components/ProductHero";
import ProductValues from "./components/ProductValues";
import ProductCategories from "./components/ProductCategories";
import ProductWhyUs from "./components/ProductWhyUs";
import ProductSmokingHero from "./components/ProductSmokingHero";

export default function Home(){
    return(
        <>
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductWhyUs />
            <ProductSmokingHero />
        </>
    )
}