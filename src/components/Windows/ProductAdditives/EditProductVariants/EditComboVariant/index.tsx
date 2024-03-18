import React, {useState} from 'react';
import ShadowWrapper from "../../../ShadowWrapper";
import styles from "../../productAdditives.module.scss";
import WindowBody from "../../../WhiteWrapper";
import {CloseIcon} from "../../../../../icons";
import {domain} from "../../../../../http/instance/instances";
import RedButton from "../../../../Buttons/RedButton";
import {useAppDispatch, useAppSelector} from "../../../../../app/hooks";
import {handleProductAdditives} from "../../../../../features/modals/modalsSlice";
import useCombo from "../../../../../hooks/useCombo";
import AdditiveItem from "../../AdditiveItem";
import {getImgPath} from "../../../../../utils/common/getAssetsPath";

const EditComboVariant = () => {
    const {
        additives = [],
        imageUrl,
        price,
        weight,
        name,
        description,
        dimensions,
        id
    } = useAppSelector(state => state.modals.productAdditivesData)
    //ТОЛЬКО ДЛЯ КОМБО
    const dispatch = useAppDispatch()
    const [addCombo, editCombo, _, thisCombo, thisComboCart] = useCombo(id)
    const saveMode = useAppSelector(state => state.modals.isChangingModeAdditives)

    const getAddedDrink = () => {
        const comboDrinks = thisCombo?.drinks
        if (thisComboCart) {
            const selectedDrinkId = thisComboCart.product.selected_product?.id
            if(selectedDrinkId !== undefined) {
                return selectedDrinkId
            }
        }
        const drinksDefined = comboDrinks !== undefined
        if (drinksDefined) {
            return comboDrinks[0].id
        }
        return -1
    }
    const [addedDrink, setAddedDrink] = useState(getAddedDrink())

    const handleAddCombo = () => {
        addCombo(addedDrink)
    }
    const handleEditCombo = () => {
        editCombo(addedDrink)
    }
    const handleProductWindow = () => dispatch(handleProductAdditives())

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
                    <div style={{backgroundImage: `url(${domain + imageUrl})`}}
                         className={`${styles.productImage}`}></div>
                    <div className={`${styles.additivesBarContainer} f-column-betw gap-20 h-100p`}>
                        <div className={`${styles.productAdditivesBar} f-column-betw gap-10`}>
                            <div className="top f-column gap-10">
                                <div className={`${styles.titleBlock} jc-between d-f al-center gap-20`}>
                                    <h3>{name}</h3>
                                    <div className={styles.weight}>{weight} {dimensions}</div>
                                </div>
                                <div className="f-column">
                                    {
                                        thisCombo.products?.map(item => (
                                            <div className={`${styles.listItem} d-f al-center gap-10`}>
                                                <span>•</span>
                                                <p>{item.title}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={`${!additives?.length ? "f-1" : ""} ${styles.drinksList} content gap-10 f-column-betw`}>
                                <div className="f-column gap-10">
                                    <h4>Выберите напиток</h4>
                                    <div className={`${styles.additiveList} d-f gap-10 flex-wrap`}>
                                        {
                                            thisCombo.drinks?.map(drink => (
                                                <AdditiveItem imageUrl={drink.image}
                                                              selected={addedDrink === drink.id}
                                                              addHandler={() => setAddedDrink(drink.id)} price={0}
                                                              name={drink.title}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.additivesBtnWrapper} d-f al-end f-1 w-100p`}>
                            <RedButton onClick={!saveMode ? handleAddCombo : handleEditCombo} disabled={false}
                                       className={`${styles.additivesBtn} pd-10-0`}>

                                {!saveMode ? `Добавить в корзину за ${price} ₽` : "Сохранить"}
                            </RedButton>
                        </div>
                    </div>
                </div>
            </WindowBody>
        </ShadowWrapper>
    )
}

export default EditComboVariant;