import { getQueryParam } from 'common/utils/queryParams';

const getVpPayload = (): VpRequestPayload | null => {
  const payload = getQueryParam('payload');
  if (!payload) return null;
  return JSON.parse(window.atob(payload)) as VpRequestPayload;
};

export { getVpPayload };
