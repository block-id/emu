import React from 'react';
import { Box, Container } from '@mui/material';

import IdListProvider, { useIdList } from 'apps/credentials/providers/id-list-provider/IdListProvider';
import Toolbar from 'apps/credentials/components/toolbar/Toolbar';

const IdList: React.FC = () => {
  const [idList, setIdList] = useIdList();
  return (
    <Container sx={(theme) => ({
      maxWidth: 'lg',
      padding: 0,
      [theme.breakpoints.down('lg')]: {
        maxWidth: '100%',
      },
    })}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 8,
      }}
      >
        <Toolbar />
      </Box>
    </Container>
  );
};

const ListWrapper: React.FC = () => (<IdListProvider><IdList /></IdListProvider>);

export default ListWrapper;
