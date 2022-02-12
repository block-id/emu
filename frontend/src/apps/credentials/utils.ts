import { getQueryParam } from 'common/utils/queryParams';

const encodeBase64Json = (json: object): string => window.btoa(JSON.stringify(json));

const decodeBase64Json = <T>(base64: string): T => JSON.parse(window.atob(base64)) as T;

const getVpPayload = (): VpRequestPayload | null => {
  const payload = getQueryParam('payload');
  if (!payload) return null;
  return decodeBase64Json<VpRequestPayload>(payload);
};

export { getVpPayload, encodeBase64Json, decodeBase64Json };
