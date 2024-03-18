import React, {useState} from 'react';
import ShadowWrapper from "../../../ShadowWrapper";
import styles from "../../productAdditives.module.scss";
import WindowBody from "../../../WhiteWrapper";
import {CloseIcon} from "../../../../../icons";
import {domain} from "../../../../../http/instance/instances";
import RedButton from "../../../../Buttons/RedButton";
import List from "../../../../List";
import SupplementItem from "../../SupplementItem";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {getFromCartAddedSupplements} from "../../../../../utils/products/getFromCartAddedSupplements";
import useProduct from "../../../../../hooks/useProduct";
import {getSupplementsTotalPrice} from "../../../../../utils/products/getSupplementsTotalPrice";
import {handleProductAdditives} from "../../../../../features/modals/modalsSlice";
import useTheme from '../../../../../hooks/useTheme';

const EditProductVariant = () => {
    const {
        additives = [],
        imageUrl,
        price,
        weight,
        name,
        is_discount,
        price_discount,
        description,
        dimensions,
        is_multiple_supplements,
        id
    } = useAppSelector(state => state.modals.productAdditivesData)
    //ТОЛЬКО ДЛЯ ОБЫЧНОГО ПРОДУКТА
    const dispatch = useAppDispatch()

    const cart = useAppSelector(state => state.cart.items)
    const [addedSupplements, setAddedSupplements] = useState<number[]>(getFromCartAddedSupplements(cart, id, additives))
    const [addProduct, saveProduct] = useProduct(id, addedSupplements)
    const additivePrice = getSupplementsTotalPrice(addedSupplements, additives)
    const gTheme = useTheme()
    const saveMode = useAppSelector(state => state.modals.isChangingModeAdditives)
    const handleProductWindow = () => dispatch(handleProductAdditives())
    
    
    const RenderSupplementsList = () => {
        if (additives?.length) {
            return <div className={`${styles.additivesListBlock} f-1 gap-10 f-column`}>
                <h4 className={gTheme("lt-dark-coal-c", "dk-gray-c")}>Дополнительно</h4>
                <List
                    listBlockClassname={`${styles.supplementsList} f-column gap-10`}
                    list={additives}
                    renderItem={
                        (item) => <SupplementItem
                            addedSupplementsIds={addedSupplements}
                            onlyOne={is_multiple_supplements === false}
                            setAddedSupplements={setAddedSupplements}
                            title={item.title}
                            id={item.id}
                            price={item.price}

                        />}
                />
            </div>
        }
        return null
    }
    return (
        <ShadowWrapper className={`${styles.additivesWindow} f-c-col p-fix h-100v w-100v`}
                       onClick={handleProductWindow}>
            <WindowBody className={`${styles.window} f-column`}>
                <div className="w-100p d-f al-end jc-end">
                    <div onClick={handleProductWindow} className={`closeWrapper ${styles.close}`}>
                        <CloseIcon isDark={true}/>
                    </div>
                </div>
                <div className={`${styles.additivesContainer} f-row-betw h-100p gap-40`}>
                    <div className={styles.productBlockImage}>
                        <img src={domain + imageUrl} alt="" />
                    </div>
                    {/* <div style={{backgroundImage: `url(${domain + imageUrl})`}}
                         className={`${styles.productImage}`}></div> */}
                    <div className={`${styles.additivesBarContainer} f-column-betw gap-20 h-100p`}>
                        <div className={`${styles.productAdditivesBar} f-column-betw gap-10`}>
                            <div className="top f-column gap-10">
                                <div className={`${styles.titleBlock} jc-between d-f al-center gap-20`}>
                                    <h3>{name}</h3>
                                    <div className={styles.weight}>{weight} {dimensions}</div>
                                </div>
                                <p className={styles.description}>{description || "Описание не заполнено"}</p>
                            </div>
                            <div className={`${additives?.length ? "f-1" : ""} content gap-10 f-column-betw`}>
                                <RenderSupplementsList/>
                            </div>
                        </div>
                        <div className={`${styles.additivesBtnWrapper} ${gTheme("lt-white-bg", "dk-gray-bg")} d-f al-end f-1 w-100p`}>
                            <RedButton onClick={saveMode ? saveProduct : addProduct} disabled={false}
                                       className={`${styles.additivesBtn} pd-10-0`}>

                                {!saveMode ? <div>Добавить в корзину за {is_discount ? ((price_discount || 0) + additivePrice) : price + additivePrice} ₽</div> : "Сохранить"}
                            </RedButton>
                        </div>

                    </div>

                </div>
            </WindowBody>
        </ShadowWrapper>
    )
}

export default EditProductVariant;