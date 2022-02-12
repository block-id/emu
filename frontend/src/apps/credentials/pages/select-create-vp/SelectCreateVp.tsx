import React, { useEffect } from 'react';

import { getQueryParam } from 'common/utils/queryParams';
import IdListProvider, {
  useIdList,
} from 'apps/credentials/providers/id-list-provider/IdListProvider';
import IdListComponent from 'apps/credentials/components/id-list/IdList';

const SelectCreateVp: React.FC = () => {
  const type = getQueryParam('type');
  const payload: VpRequestPayload = getQueryParam('payload')
    ? JSON.parse(window.atob(getQueryParam('payload') as string).toString())
    : {};

  const [idList, setIdList] = useIdList();

  useEffect(() => {
    setIdList({
      ...idList,
      type,
      isLoaded: false,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!payload || !type) return <p>Invalid page request (make this error prettier)</p>;

  return <IdListComponent />;
};

const ListWrapper: React.FC = () => (
  <IdListProvider>
    <SelectCreateVp />
  </IdListProvider>
);

export default ListWrapper;
