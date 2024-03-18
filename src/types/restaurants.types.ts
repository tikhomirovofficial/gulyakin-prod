
export type RestaurantItemType = {
    cityArea: string,
    canOnlineOrder: boolean,
    street: string,
    coords: Array<number>
}

export type MarketInfo = {
    id: number,
    name: string,
    short_description: string,
    description: string,
    link: string
}
export type RestaurantDetails = {
    id: number,
    adress: string,
    market: MarketInfo,
    phone: string,
    long: number,
    lat: number,
    work_with: number,
    works_until: number,
    timeaone: number,
    time: Array<Array<string>>
    image: string[]
}