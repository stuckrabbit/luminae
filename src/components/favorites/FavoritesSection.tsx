"use client";

import { useEffect, useState } from "react";
import { Product } from "../utils/Product";
import styles from "./FavoritesSection.module.css";
import ProductDisplayCard from "../products/ProductDisplayCard";
import { useFavoritesStore } from "../lib/store/useFavoritesStore";
import { useRouter } from "next/navigation";
import { baseURL } from "../lib/constants";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function FavoritesSection() {
    const favoritesProductData = useFavoritesStore(state => state.fetchData());

    const [products,setProducts] = useState<Product[]>();
    const [productsLoadStatus,setProductsLoadStatus] = useState(false);

    const router = useRouter();

    const removeProductFromFavorites = (product : Product) => {
        const filteredProducts = products?.filter((item) => item._id !== product._id);
        setProducts(filteredProducts);
    }

    const handleClick = (product : Product) => {
        const productId = product._id;
          router.push(baseURL + '/item/' + productId);
    }

    useEffect(() => {
        const productsId : string[] = [];
        favoritesProductData.map((item) => productsId.push(item));
        const fetchData =  async() => {
            try {
                const response = await fetch('api/fetchCartProducts/' + productsId);
                const data = await response.json();
                const products : Product[] = data.map((item: Product) => {
                const product: Product = {
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
                    color: item.color,
                    style: item.style,
                    productModel: item.productModel,
                    previousPrice: item.previousPrice
                }

                return product;
            });
                console.log(products);
                setProducts(products);
            }
            catch (error) {
                console.log(error);
            }

            setProductsLoadStatus(true);
        }

        fetchData();

    },[favoritesProductData.length])

    return (<div className={styles.container}>
            <div className={styles.contentContainer}>
                {!productsLoadStatus && <div className={styles.emptySection}>
                <Box sx={{ margin: 'auto', display: 'flex', height: '100px', width : '100px' }}>
            <CircularProgress />
        </Box>
                </div>}
                {products?.map((item) => <ProductDisplayCard product={item} key={item._id} onClick={() => handleClick(item)} 
                onRemoveFromFavorites={removeProductFromFavorites}/>)}
                {(productsLoadStatus && products === undefined) && <div className={styles.emptySection}>
                <h3 className={styles.infoText}>You didnt add any products to favorites.</h3>
            </div>}
            </div>
    </div>);
}

export default FavoritesSection;