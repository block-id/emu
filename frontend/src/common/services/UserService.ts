import Axios from 'axios';

import { USER_API_URL } from 'common/constants';
import BaseService from './BaseService';

export default class UserService extends BaseService {
  async getCurrentUser(): Promise<IUser> {
    const user: IUser = (await Axios.get(USER_API_URL)).data;
    return user;
  }
}
