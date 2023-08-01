
import ProductHero from "./components/ProductHero";
import ProductValues from "./components/ProductValues";
import ProductCategories from "./components/ProductCategories";
import ProductWhyUs from "./components/ProductWhyUs";
import ProductCTA from "./components/ProductCTA";
import ProductSmokingHero from "./components/ProductSmokingHero";

export default function Home(){
    return(
        <>
            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductWhyUs />
            <ProductCTA />
            <ProductSmokingHero />
        </>
    )
}