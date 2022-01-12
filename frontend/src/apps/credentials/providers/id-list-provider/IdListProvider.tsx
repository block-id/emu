import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import IdService from 'apps/credentials/services/IdService';
import { getQueryParam, getAllParams, setQueryParams } from 'common/utils/queryParams';

const idService = new IdService();
const IdContext = createContext<IdListProviderContext | undefined>(undefined);

const IdListProvider: React.FC = ({ children }) => {
  const [idList, setIdList] = useState<IdList>({
    data: undefined,
    isLoaded: false,
    page: parseInt(getQueryParam('page') || '1'),
    query: getQueryParam('query'),
  });

  useEffect(() => {
    if (idList.isLoaded) return;

    let cancelLoad = false;
    // Fetch data
    idService.listIds({ page: idList.page }).then((response) => {
      if (cancelLoad) return;

      setIdList({
        data: response.data,
        isLoaded: true,
        page: idList.page,
        query: idList.query,
      });
    }).catch((error) => {
      alert(`TODO: Handle exceptions! ${error.message}`);
    });

    // Update query params
    setQueryParams({
      ...getAllParams(),
      query: idList.query?.toString(),
      page: idList.page.toString(),
    });

    return () => { cancelLoad = true; };
  }, [idList.isLoaded, idList.page, idList.query]);

  return <IdContext.Provider value={[idList, setIdList]}>{children}</IdContext.Provider>;
};

const useIdList = ():IdListProviderContext => useContext(IdContext) as IdListProviderContext;

export default IdListProvider;
export { useIdList };
