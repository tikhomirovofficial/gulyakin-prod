import {AdditiveProduct} from "../../../../types/products.types";
import React, {FC} from "react";
import {HasClassName} from "../../../../types/components.types";
import styles from "../productAdditives.module.scss";
import {getImgPath} from "../../../../utils/common/getAssetsPath";
import {AddedAdditiveIcon} from "../../../../icons";
import {domain} from "../../../../http/instance/instances";

type AdditiveItemProps = {
    selected: boolean,
    addHandler: () => void
    isEmpty?: boolean,
    imageUrl?: string,
    name: string

} & AdditiveProduct
const AdditiveItem: FC<HasClassName & AdditiveItemProps> = ({
                                                                name,
                                                                addHandler,
                                                                imageUrl = "",
                                                                selected,
                                                                className,
                                                                isEmpty,
                                                            }) => {
    return (
        <div onClick={addHandler}
             className={`${styles.item} ${selected ? styles.itemSelected : ""} f-column-betw gap-10 al-center txt-center p-rel`}>

            <div className={styles.imageWrapper}>
                {isEmpty ?
                    <div style={{backgroundImage: `url(${getImgPath('additive_plashka.png')})`}}
                         className={`${styles.img} f-c-col`}>
                    </div> :
                    <div style={{backgroundImage: `url(${domain}/${imageUrl})`}}
                         className={`${styles.img}`}>
                    </div>
                }

            </div>

            <div className={"f-column"}>
                <b>{isEmpty ? "Без напитка" : name}</b>
                {/*<b>{isEmpty ? "Бесплатно" : `${price} ₽`}</b>*/}
            </div>
            <div className={`f-c-col p-abs ${styles.addedIconBlock} t-opacity-visible-3`}>
                <AddedAdditiveIcon width={15} height={15}/>
            </div>
        </div>
    )
}
export default AdditiveItem