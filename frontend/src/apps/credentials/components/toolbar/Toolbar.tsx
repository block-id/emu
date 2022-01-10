import React from 'react';

import {
  AppBar, Toolbar as MuiToolbar, Typography, styled, alpha, InputBase,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  width: '100%',
  display: 'flex',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    transition: theme.transitions.create('width'),
    padding: theme.spacing(0.8),
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(0.8),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Toolbar: React.FC = () => (
  <AppBar position="static">
    <MuiToolbar>
      <Typography
        variant="h6"
        component="div"
        noWrap
        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
      >
        Your IDs
      </Typography>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInput placeholder="Search" />
      </Search>
    </MuiToolbar>
  </AppBar>
);

export default Toolbar;
