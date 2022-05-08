interface VpRequestPayload {
  attributeGroups: string[],
  requesterName: string,
  sendTo: string,
  entropy: string,
}

interface VerifiablePresentationData {
  entropy: string;
  id: VerifiableId['data'];
}

interface VerifiablePresentation {
  data: VerifiablePresentationData,
  signature: string,
}
