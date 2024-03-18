import React, {FC} from 'react';
import {Preloader} from "../../icons";
import { useAppSelector } from '../../app/hooks';
import useAppColor from '../../hooks/useAppColor';

type LoaderProps = {
    height?: number
    width?: number
}
const Loader: FC<LoaderProps> = ({height= 100, width = 100}) => {
    const appColor = useAppColor()
    return (
        <div style={{minHeight: "20rem"}} className={"w-100p h-100p f-c-col f-1"}>
            <div className="f-c-col infiniteSpin w-content h-content">
                <Preloader fill={appColor} height={height} width={width}/>
            </div>

        </div>
    );
};
export const BigSpinner = () => {
    return (
        <div className={"d-f jc-center al-center"}>
            <Loader/>
        </div>
    )
}
export default Loader;