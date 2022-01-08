import Axios, { AxiosResponse } from 'axios';

import { IDS_API_URL } from 'common/constants';
import BaseService from 'common/services/BaseService';

export default class IdService extends BaseService {
  async listIds(params: {page?: number; page_size?: number}): Promise<AxiosResponse<any, any>> {
    return Axios.get(IDS_API_URL, this.buildAxiosConfig({ params }));
  }
}
