interface VpRequestPayload {
  attributeGroups: string[],
  requesterName: string,
  sendTo: string,
  entropy: string,
}

interface VerifiablePresentationData extends VerifiableId {
  entropy: string,
}

interface VerifiablePresentation {
  data: VerifiablePresentationData,
  signature: string,
}
