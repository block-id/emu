import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import IdService from 'apps/credentials/services/IdService';

const idService = new IdService();
const IdContext = createContext<IdListProviderContext | undefined>(undefined);

const IdListProvider: React.FC = ({ children }) => {
  const [idList, setIdList] = useState<IdList>({
    data: undefined,
    isLoaded: false,
    page: 1,
  });

  useEffect(() => {
    if (idList.isLoaded) return;

    let cancelLoad = false;
    idService.listIds({ page: idList.page }).then((response) => {
      if (cancelLoad) return;

      setIdList({
        data: response.data,
        isLoaded: true,
        page: idList.page,
      });
    }).catch((error) => {
      alert(`TODO: Handle exceptions! ${error.message}`);
    });

    return () => { cancelLoad = true; };
  }, [idList.isLoaded, idList.page]);

  return <IdContext.Provider value={[idList, setIdList]}>{children}</IdContext.Provider>;
};

const useIdList = ():IdListProviderContext => useContext(IdContext) as IdListProviderContext;

export default IdListProvider;
export { useIdList };
