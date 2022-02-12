import React from 'react';

import IdListProvider from 'apps/credentials/providers/id-list-provider/IdListProvider';
import IdListComponent from 'apps/credentials/components/id-list/IdList';

const IdList: React.FC = () => <IdListComponent />;

const ListWrapper: React.FC = () => (<IdListProvider><IdList /></IdListProvider>);

export default ListWrapper;
