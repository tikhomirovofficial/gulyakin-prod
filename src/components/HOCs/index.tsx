import React, {FC, ReactNode} from 'react';

type WithProps = {
    condition: boolean,
    onTrueComponent: ReactNode,
    onFalseComponent: ReactNode
}
const With: FC<WithProps>   = ({condition, onFalseComponent, onTrueComponent}) => {
    return <>
        {condition ?  onTrueComponent : onFalseComponent}
    </>

};

export default With;