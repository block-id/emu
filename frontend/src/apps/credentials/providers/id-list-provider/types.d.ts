interface IdList {
  data: undefined | {count: number, next: string | null, previous: string | null, results: Id[], },
  isLoaded: boolean,
  page: number
}

type IdListProviderContext = [
  IdList,
  React.Dispatch<React.SetStateAction<IdList>>,
];

interface Id {
  id: number;
  type: string;
  verifiable_id: VerifiableId;
  created_at: string;
  verified_at: string;
}

interface VerifiableId {
  idType: string;
  idName: string;
  issuer: {
    name: string;
    publicKey: string;
    logo: string;
  },
  groups: AttributeGroup[],
}

interface AttributeGroup {
  data: {
    groupName: string;
    attributes: {
      [key: string]: {
        type: 'string' | 'image';
        value: string;
      }
    }
  },
  subject: {
    publicKey: string;
  },
  issuer: {
    publicKey: string;
  },
  issuedAt: string;
  expiresAt: string;
  signature: string;
}
