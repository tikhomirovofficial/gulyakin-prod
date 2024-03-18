import React from 'react';
import {useAppSelector} from "../../../app/hooks";
import EditProductVariant from "./EditProductVariants/EditProductVariant";
import EditComboVariant from "./EditProductVariants/EditComboVariant";


const ProductAdditives = () => {
    const {
        is_combo
    } = useAppSelector(state => state.modals.productAdditivesData)

    return !is_combo ? <EditProductVariant/> : <EditComboVariant/>
};

export default ProductAdditives;