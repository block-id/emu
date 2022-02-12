import React from 'react';
import {
  Box, Container, Pagination,
} from '@mui/material';
import { UsePaginationProps } from '@mui/material/usePagination';

import { useIdList } from 'apps/credentials/providers/id-list-provider/IdListProvider';
import Toolbar from 'apps/credentials/components/toolbar/Toolbar';
import IdCard from 'apps/credentials/components/id-card/IdCard';
import debounce from 'common/utils/debounce';

const IdList: React.FC = () => {
  const [idList, setIdList] = useIdList();
  const numPages = Math.ceil((idList.data?.count || 0) / (idList.data?.page_size || 1));

  const handlePageChange: UsePaginationProps['onChange'] = (event, value) => {
    setIdList({
      ...idList,
      page: value,
      isLoaded: false,
    });
  };

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.trim();
      if (query === idList.query) return;

      setIdList({
        ...idList,
        query,
        page: 1,
        isLoaded: false,
      });
    }, 500,
  );

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
        <Toolbar onSearch={handleSearch} />
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 2,
          width: '100%',
          marginBottom: 2,
        }}
        >
          {idList.data?.results?.map((id) => <IdCard key={id.id} id={id} />)}
        </Box>
        {numPages > 1
        && (
        <Box sx={{ marginBottom: 2 }}>
          <Pagination
            count={numPages}
            onChange={handlePageChange}
            page={idList.page}
            color="primary"
            size="large"
          />
        </Box>
        )}
      </Box>
    </Container>
  );
};

export default IdList;
