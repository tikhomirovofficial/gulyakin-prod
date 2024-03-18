import React, {FC, useEffect} from 'react';
import styles from "./catalog.module.scss";
import List from "../List";
import Product from "./Product";
import {useAppSelector} from "../../app/hooks";
import {BigSpinner} from "../Preloader";
import {getCombinedData, searchProducts} from "../../utils/common/productsFilter";
import {Element} from 'react-scroll'
import useTheme from '../../hooks/useTheme';
type CatalogProps = {
    search: string
}

const Catalog: FC<CatalogProps> = ({search}) => {
    const {categories, products, cart} = useAppSelector(state => state)
    const isLoaded = !categories.isLoading && !products.productsLoading 
    const gTheme = useTheme()
    const searchedData = searchProducts(search, getCombinedData(categories.category, products.items))
    useEffect(() => {
    }, [search])
    return (
        <>
            {isLoaded ?
                <div className="block f-column gap-40 ">
                    {
                        searchedData.length > 0 ?
                            searchedData.map(category => (
                                <Element name={`ctg-${category.id}`} key={category.id} className={`${styles.categoryBlock} f-column gap-20`}>
                                    <h2 className={`sectionTitle ${gTheme("lt-coal-c", "dk-gray-c")}`}>{category?.title}</h2>
                                    <List
                                        listBlockClassname={`${styles.catalogPartList} d-f flex-wrap gap-20`}
                                        list={category?.products}
                                        listItemClassname={styles.catalogProductWrapper}
                                        renderItem={(product) =>
                                            <Product
                                                key={product.id}
                                                title={product.title}
                                                is_discount={product.is_discount}
                                                price_discount={~~(product.price_discount || 0)}
                                                dimensions={product.dimensions}
                                                is_multiple_supplements={product.is_multiple_supplements}
                                                is_product_week={product.is_product_week !== undefined ? product.is_product_week : false}
                                                is_product_day={product.is_product_day !== undefined ? product.is_product_day : false}
                                                id={product.id}
                                                count={cart.items.filter(item => item.product.id === product.id)[0]?.count}
                                                inCart={cart.items.some(item => item.product.id === product.id && !item.is_combo)}
                                                image={product.image}
                                                composition={product.composition}
                                                weight={product.weight}
                                                price={product.price} category={product.category}
                                                description={product.description}
                                                short_description={product.short_description}
                                                supplements={product.supplements}/>
                                        }/>
                                </Element>
                            )) :
                            <p className={`${styles.notFoundedText} ${gTheme("lt-lg-c", " grayColor_dark")}`}>{search.length ? `По запросу: ${search} ничего не найдено.` : "Здесь пока нет товаров."}</p>
                    }
                </div> :
                <BigSpinner/>
            }
        </>

    );
};

export default Catalog;