import { getQueryParam } from 'common/utils/queryParams';

const getVpPayload = (): VpRequestPayload => {
  const payload = getQueryParam('payload');
  if (!payload) throw Error('No payload found');
  return JSON.parse(payload) as VpRequestPayload;
};

export { getVpPayload };
