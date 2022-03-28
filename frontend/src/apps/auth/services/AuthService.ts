import Axios, { AxiosResponse } from 'axios';

import BaseService from 'common/services/BaseService';
import {
  LOGIN_API_URL,
  LOGOUT_API_URL,
  REGISTER_API_URL,
  SIGNING_API_URL,
} from 'common/constants';

export default class AuthService extends BaseService {
  async login(username: string, password: string): Promise<IUser> {
    const response = await Axios.post(
      LOGIN_API_URL,
      { username, password },
      this.getDefaultAxiosConfig(),
    );
    return response.data as IUser;
  }

  async register(
    username: string,
    password: string,
    password2: string,
  ): Promise<AxiosResponse<any, any>> {
    const response = await Axios.post(
      REGISTER_API_URL,
      { username, password, password2 },
      this.getDefaultAxiosConfig(),
    );
    return response;
  }

  logout(): Promise<AxiosResponse<any, any>> {
    return Axios.post(LOGOUT_API_URL, undefined, this.getDefaultAxiosConfig());
  }

  async sign(
    payload: string,
    password: string,
  ): Promise<AxiosResponse<SignResponse, any>> {
    return Axios.post(SIGNING_API_URL, { payload, password }, this.getDefaultAxiosConfig());
  }
}
