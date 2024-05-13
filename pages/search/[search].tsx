import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import ProductPage from "../../src/app/products/ProductPage";
import ProductsBrowser from "../../src/app/products/ProductsBrowser";
import FooterTemplate from "../../src/app/shared/FooterTemplate";
import HeaderTemplate from "../../src/app/shared/HeaderTemplate";
import StoreInteractionContainer, { ProductSection } from "../../src/app/shared/ProductCategoriesManager";
import NoProductFound from "../../src/app/products/NoProductFound";
import { Product } from "../../src/app/utils/Product";



function search() {
    const router = useRouter();
    const { search } = router.query;
    const [products,setProducts] = useState<Product[]>([]);
    let resultFinalized : boolean = false;
    useEffect(
        () => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/searchProduct',{
                  method:"POST",
                  body: search as string
                });
                const data = await response.json();
                const fetchedProducts = data.map((item: Product) => ({
                    _id: item._id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    images: item.images,
                    discount: item.discount,
                    inventoryCount: item.inventoryCount,
                    brandName: item.brandName,
                    category: item.category,
                    section: item.section,
                    sizes: item.sizes,
                    style: item.style,
                    color: item.color,
                    model: item.model,
                    reviews: item.reviews
                }));

              setProducts(fetchedProducts);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            resultFinalized = true;
          };

          setTimeout(fetchData,1);       
    },[search])

    const handleClick = (product : Product) => {

    }

    return (<>
      <HeaderTemplate/>
      <StoreInteractionContainer/>
      {products.length > 0 && <ProductsBrowser onClick={handleClick} products={products} onBack={() => {}}/>}
      {(resultFinalized  && products.length == 0) && <NoProductFound searchTerm={search as string} />}
      <FooterTemplate/>
    </>);
}


export default search;