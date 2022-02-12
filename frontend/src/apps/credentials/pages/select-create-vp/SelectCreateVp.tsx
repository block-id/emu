import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { getQueryParam } from 'common/utils/queryParams';
import IdListProvider, {
  useIdList,
} from 'apps/credentials/providers/id-list-provider/IdListProvider';
import IdListComponent from 'apps/credentials/components/id-list/IdList';
import { getVpPayload } from 'apps/credentials/utils';

const SelectCreateVp: React.FC = () => {
  const type = getQueryParam('type');
  const payload = getVpPayload();

  const { search } = useLocation();
  const navigate = useNavigate();
  const onClickId: IdListProps['onClickId'] = (id) => {
    navigate(`${id.toString()}${search}`);
  };

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

  return <IdListComponent showDelete={false} onClickId={onClickId} />;
};

const ListWrapper: React.FC = () => (
  <IdListProvider>
    <SelectCreateVp />
  </IdListProvider>
);

export default ListWrapper;
