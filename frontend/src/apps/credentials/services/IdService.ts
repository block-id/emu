import Axios, { AxiosResponse } from 'axios';

import { IDS_API_URL } from 'common/constants';
import BaseService from 'common/services/BaseService';

export default class IdService extends BaseService {
  async listIds(params: {
    page?: number;
    page_size?: number;
    query?: string;
    type?: string;
  }): Promise<AxiosResponse<any, any>> {
    return Axios.get(IDS_API_URL, this.buildAxiosConfig({ params }));
  }

  async deleteId(url: string): Promise<AxiosResponse<any, any>> {
    return Axios.delete(url, this.getDefaultAxiosConfig());
  }

  async getId(id: number): Promise<AxiosResponse<Id, any>> {
    return Axios.get(`${IDS_API_URL}${id}/`, this.getDefaultAxiosConfig());
  }

  async createVp(
    id: number,
    params: {attributeGroups: string[], entropy: string, password: string},
  ): Promise<AxiosResponse<VerifiablePresentation, any>> {
    return Axios.post(
      `${IDS_API_URL}${id}/create-vp/`,
      params,
      this.buildAxiosConfig(),
    );
  }
}
