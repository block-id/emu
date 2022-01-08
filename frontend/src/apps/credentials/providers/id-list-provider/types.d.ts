interface IdList {
  // TODO: Add stronger type defs
  data: undefined | {count: number, next: string | null, previous: string | null, results: any[], },
  isLoaded: boolean,
  page: number
}

type IdListProviderContext = [
  IdList,
  React.Dispatch<React.SetStateAction<IdListProviderContext['0']>>,
];
