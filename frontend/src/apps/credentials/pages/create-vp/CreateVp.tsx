import React from 'react';

import { getQueryParam } from 'common/utils/queryParams';
import IdListProvider from 'apps/credentials/providers/id-list-provider/IdListProvider';

const CreateVp: React.FC = () => {
  const uid = getQueryParam('uid');
  const payload = getQueryParam('payload')
    ? JSON.parse(window.atob(getQueryParam('payload') as string).toString())
    : {};

  return <>test</>;
};

const ListWrapper: React.FC = () => (
  <IdListProvider>
    <CreateVp />
  </IdListProvider>
);

export default ListWrapper;
