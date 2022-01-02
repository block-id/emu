import Axios, { AxiosResponse } from 'axios';

import BaseService from 'common/services/BaseService';
import { LOGIN_API_URL, LOGOUT_API_URL } from 'common/constants';

export default class AuthService extends BaseService {
  async login(username: string, password: string): Promise<IUser> {
    const response = await Axios.post(LOGIN_API_URL, { username, password }, this.getDefaultAxiosConfig());
    return response.data as IUser;
  }

  logout(): Promise<AxiosResponse<any, any>> {
    return Axios.post(LOGOUT_API_URL, undefined, this.getDefaultAxiosConfig());
  }
}
