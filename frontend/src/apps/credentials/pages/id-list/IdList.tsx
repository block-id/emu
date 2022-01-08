import React from 'react';

import IdListProvider, { useIdList } from 'apps/credentials/providers/id-list-provider/IdListProvider';

const IdList: React.FC = () => {
  const [idList, setIdList] = useIdList();
  return <p>{JSON.stringify(idList)}</p>;
};

const ListWrapper: React.FC = () => (<IdListProvider><IdList /></IdListProvider>);

export default ListWrapper;
