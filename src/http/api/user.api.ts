import {
    AddressAddRequest, AddressAddResponse,
    ChangeUserRequest,
    ChangeUserResponse, DeleteUserAddressRequest, DeleteUserAddressResponse,
    GetUserDataResponse,
    JWT,
    LoginRequest,
    LoginResponse, RefreshRequest, RefreshResponse,
    RegistrationRequest,
    RegistrationResponse, UserAddressesResponse
} from "../../types/api.types";
import {AxiosResponse} from "axios";
import authApi, {api} from "../instance/instances";
import {UserData} from "../../types/user.types";
import {PATHS} from "./path.api";

export class UserApi {
    //AUTH REQS
    static async Registration(requestData: RegistrationRequest): Promise<RegistrationResponse> {
        const res: AxiosResponse<RegistrationResponse> = await api.post(PATHS.USER_REGISTER, {...requestData})
        return res.data
    }

    static async Login(requestData: LoginRequest): Promise<LoginResponse>{
        const res: AxiosResponse<LoginResponse> = await api.post(PATHS.USER_LOGIN, {...requestData});
        return res.data;
    }

    static async RefreshToken(requestData: RefreshRequest): Promise<AxiosResponse<RefreshResponse>> {
        const res: AxiosResponse<RefreshResponse> = await authApi.post(PATHS.USER_TOKEN_REFRESH, {...requestData})
        return res
    }
    // USER REQS
    static async User(): Promise<any> {
        const res = await authApi.get(PATHS.USER_GET);
        if(!res.data) {
            throw res
        }
        return res;
    }

    static async Edit(requestData: ChangeUserRequest): Promise<any> {
        const res = await authApi.post(PATHS.USER_EDIT, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }

    static async AddAddress(requestData: AddressAddRequest): Promise<AxiosResponse<AddressAddResponse>> {
        const res: AxiosResponse<AddressAddResponse> = await authApi.post(PATHS.USER_ADDRESS_ADD, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }

    static async Addresses(): Promise<AxiosResponse<UserAddressesResponse>> {
        const res: AxiosResponse<UserAddressesResponse> = await authApi.get(PATHS.USER_ADDRESS_GET);
        if(!res.data) {
            throw res
        }
        return res;
    }
    static async DeleteAddress(requestData: DeleteUserAddressRequest): Promise<AxiosResponse<DeleteUserAddressResponse>> {
        const res: AxiosResponse<DeleteUserAddressResponse> = await authApi.post(PATHS.USER_ADDRESS_DEL, {...requestData});
        if(!res.data) {
            throw res
        }
        return res;
    }

}