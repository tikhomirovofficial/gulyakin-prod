import {FC} from "react";

export interface RouteProps {
    path?: string
    isAuth?: boolean
    Component: FC
}


export type RoutesList = Array<RouteProps>