import React, {FC} from 'react';
import {RouteProps} from "../types/router.types";

const PublicRoute: FC<RouteProps> = ({Component}) => {

    return <Component/>

};

export default PublicRoute;