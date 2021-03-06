import React from 'react';
import {
  Avatar,
  Box, Chip, IconButton, Tooltip, Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { useDialog } from 'common/providers/dialog-provider/DialogProvider';
import { useIdList } from 'apps/credentials/providers/id-list-provider/IdListProvider';
import IdService from 'apps/credentials/services/IdService';

dayjs.extend(relativeTime);

const idService = new IdService();
const Toolbar: React.FC<{id: Id, showDelete?: boolean}> = ({ id, showDelete }) => {
  const [idList, setIdList] = useIdList();
  const { displayDialog } = useDialog();

  const verifiableId = id.verifiable_id;
  const addedOn = dayjs(id.created_at);

  const handleDelete = () => {
    displayDialog({
      content: 'Do you want to delete this ID?',
      agreeText: 'Yes',
      disagreeText: 'No',
      onAgree: (close) => {
        idService.deleteId(id.id).then(
          () => {
            setIdList({
              ...idList,
              isLoaded: false,
            });
            close();
          },
        ).catch((e) => {
          alert(`Could not delete id: ${e}`);
        });
      },
      onDisagree: (close) => close(),
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={verifiableId.data.issuer.logo}
          sx={{ width: 50, height: 50 }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: 1,
          }}
        >
          <Typography variant="h6">
            {`${verifiableId.data.issuer.name} / ${verifiableId.data.idName}`}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 1 }}>
            <Chip
              label={`Added: ${addedOn.fromNow()}`}
              variant="outlined"
              color="success"
              size="small"
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <Tooltip title="Create Verifiable Presentation">
          <IconButton>
            <HistoryEduIcon />
          </IconButton>
        </Tooltip> */}
        {showDelete === true
        && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default Toolbar;
