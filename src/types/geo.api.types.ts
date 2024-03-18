export type QueryRequest = {
    query: string
    count?: number
}
export type SuggestionsResponse = {
    suggestions: Array<{
        value: string
        data: {
            city: string,
            street_type: string,
            house: string,
            geo_lat: string,
            flat: string
            geo_lon: string,
        }
    }>
}