export const PATHS = {
    USER_LOGIN: "/auth/token/get",
    USER_TOKEN_REFRESH: "/auth/token/refresh",
    USER_REGISTER: "/auth/token/create",
    USER_GET: "/lk/",
    USER_EDIT: "/lk/edit",
    USER_ADDRESS_ADD: "/lk/adress/add",
    USER_ADDRESS_GET: "/lk/adress/get",
    USER_ADDRESS_DEL: "/lk/adress/del",

    MARKET_CITIES: "/market/",
    PRODUCT_BY_MARKET: "/product/in-market",
    CITY_ADDRESSES: "/market/adress/siti",
    MARKETS_BY_CITY: "/market/adress/market",
    MARKET_ADDRESSES_BY_CITY: "/market/adress/market/siti",
    MARKET_INFO: "/market/info",
    MARKET_CATEGORIES: "/product/category",
    MARKET_SOUSES: "/product/souse",
    MARKET_COMBOS: "/product/combo",
    MARKET_PRODUCT_OF_THE_DAY: "/product/day",
    MARKET_ADDRESS_INFO: "/market/adress/info",

    BOOKINGS_LIST: "/booking/list",
    BOOKING_CREATE: "/booking/create",

    ADD_TO_CART: "/cart/add",
    ADD_TO_CART_COMBO: "/cart/add/combo",
    EDIT_CART_COMBO: "/cart/edit/combo",
    VIEW_CART: "/cart/list",
    EDIT_CART_ITEM: "/cart/edit",
    EDIT_CART_SUPPLEMENTS: "/cart/edit/supplements",
    DELETE_CART_ITEM: "/cart/delete/",
    RESET_CART: "/cart/clear",

    DELIVERY_OPTIONS: "/order/delivery/list",
    GET_TYPE_DELIVERY: "/order/geo/delivery/type",
    PAYMENT_OPTIONS: "/order/payment/list",

    CREATE_ORDER: "/order/create",
    PAYMENT_CONFIRMATION: "/order/success",
    GET_ORDER: "/order/get",
    ORDER_HISTORY: "/order/list",
    ORDER_SETTINGS: "/settings/order-settings",

    ACCESSIBILITY_ORDER_CITY: "/order/check ",
    ACCESSIBILITY_ORDER_CITY_ADDRESSES: "/order/check/get-adress",

    GEO_SUGGESTIONS: "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address/"
};
