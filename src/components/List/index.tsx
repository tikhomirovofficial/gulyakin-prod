import React, {CSSProperties, FC, ReactNode} from 'react';

interface ListProps<T> {
    list: Array<T>
    renderItem: (item: T, index: number) => ReactNode
    listBlockClassname?: string
    listItemClassname?: string
    stylesListBlock?: CSSProperties
    stylesListItem?: CSSProperties
}
function List<T>(props: ListProps<T>) {
    const {list, renderItem, stylesListBlock, stylesListItem, listItemClassname, listBlockClassname} = props
    return (
        <div className={listBlockClassname} style={stylesListBlock}>
            {list.map((item, index) => (
                <div className={listItemClassname} style={stylesListItem} key={index}>{renderItem(item, index)}</div>
            ))}
        </div>
    );
}

export default List;