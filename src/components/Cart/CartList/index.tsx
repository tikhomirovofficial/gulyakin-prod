import React from 'react';
import List from "../../List";
import styles from "../cart.module.scss";
import CartItem from "../CartItem";
import {useAppSelector} from "../../../app/hooks";

const CartList = () => {
    const {items} = useAppSelector(state => state.cart)
    return (
        <List
            listBlockClassname={`${styles.listProducts} f-column gap-5`}
            list={items}
            renderItem={(item) => {
                const isCombo = item.is_combo
                if (!isCombo) {
                    return (
                        <CartItem
                            is_combo={item.is_combo}
                            supplements={item.supplements}
                            id={item.id}
                            count={item.count}
                            key={item.id}
                            canNotBeAdded={item.id < 0}
                            product={{
                                products: [],
                                dimensions: item.product.dimensions,
                                is_discount: item.product.is_discount,
                                price_discount: ~~(item.product.price_discount || 0),
                                composition: item.product.composition,
                                id: item.product.id,
                                image: item.product.image,
                                price: item.product.price,
                                short_description: item.product.short_description,
                                title: item.product.title
                            }}
                        />
                    )
                }
                return (
                    <CartItem
                        is_combo={item.is_combo}
                        supplements={[]}
                        id={item.id}
                        count={item.count}
                        key={item.id}
                        canNotBeAdded={item.id < 0}
                        product={{
                            products: item.product?.products,
                            dimensions: "г",
                            composition: item.product?.products !== undefined ? item.product.products.map(item => item.title).join(', ') : "" || "",
                            id: item.product.id,
                            image: item.product.image,
                            price: item.product.price,
                            short_description: item.product.short_description,
                            title: item.product.title,
                            selected_product: item.product.selected_product,
                            drinks: item.product.drinks
                        }}
                    />
                )

            }}
        />
    );
};

export default CartList;