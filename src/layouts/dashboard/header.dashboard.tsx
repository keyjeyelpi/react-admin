import {
  Box,
  AppBar,
  Typography,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  Button,
  Popover,
  Tooltip,
  MenuItem,
  Container,
} from '@mui/material';
import { cloneElement, useState } from 'react';
import {
  TbBell,
  TbChevronDown,
  TbCirclePlus,
  TbCreditCard,
  TbGift,
  TbLock,
  TbSearch,
  TbUser,
} from 'react-icons/tb';
import useDashboard from '../../hooks/dashboard.hook';
import { useBreakpoint } from '../../theme';
import { useAppDispatch, useAppSelector } from '../../store';
import { setLogout } from '../../store/slices/user.slice';
import { DashboardLayoutSidebarToggle } from './sidebar';

const noop = () => {};

const DashboardLayoutHeader = () => {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.user);
  const { breakpoint } = useBreakpoint();
  const { collapsed } = useDashboard();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const options = [
    {
      label: 'Gift',
      onClick: noop,
      icon: <TbGift />,
    },
    {
      label: 'Notifications',
      onClick: noop,
      icon: <TbBell />,
    },
    {
      label: 'Notes',
      onClick: noop,
      icon: <TbCirclePlus />,
    },
  ];

  const profileSettings = [
    {
      category: '',
      options: [
        {
          label: 'Account',
          onClick: () => dispatch(setLogout()),
          icon: <TbUser />,
        },
        {
          label: 'Security',
          onClick: () => dispatch(setLogout()),
          icon: <TbLock />,
        },
        {
          label: 'Billing',
          onClick: () => dispatch(setLogout()),
          icon: <TbCreditCard />,
        },
      ],
    },
  ];

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        height: 64,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          height: 64,
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            py: 2,
            height: '100%',
          }}
        >
          <Stack flexDirection="row" alignItems="center" gap={2}>
            {collapsed && <DashboardLayoutSidebarToggle />}
            {breakpoint === 'xs' ? (
              <IconButton>
                <TbSearch size={18} />
              </IconButton>
            ) : (
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TbSearch />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Stack>
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <Stack flexDirection="row" gap={1}>
              {options.map((option, index) => (
                <Tooltip title={option.label} key={option.label + index}>
                  <IconButton
                    size="small"
                    onClick={option.onClick}
                    sx={{
                      color: 'divider.main',
                    }}
                  >
                    {cloneElement(option.icon, {
                      size: 20,
                    })}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
            <Divider orientation="vertical" flexItem />
            <Button
              size="small"
              sx={{
                p: 0,
                color: 'text.primary',
              }}
              onClick={handleClick}
              endIcon={<TbChevronDown />}
            >
              <Stack flexDirection="row" gap={2} alignItems="center">
                <Box
                  component="img"
                  sx={{
                    height: 32,
                    width: 32,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    bgcolor: 'background.100',
                  }}
                  src={profile?.avatar || 'https://i.pravatar.cc/300'}
                  alt="Profile"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                  }}
                />
              </Stack>
            </Button>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              elevation={0}
              PaperProps={{
                sx: {
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                  backgroundColor: 'background.default',
                  mt: 1,
                  borderRadius: 2,
                  minWidth: 300,
                },
              }}
            >
              <Stack
                flexDirection="row"
                gap={2}
                sx={{
                  p: 2,
                }}
                alignItems="center"
              >
                <Box
                  component="img"
                  sx={{
                    height: 32,
                    width: 32,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    bgcolor: 'background.100',
                  }}
                  src={profile?.avatar || 'https://i.pravatar.cc/300'}
                  alt="Profile"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                  }}
                />
                <Stack>
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      textAlign: 'left',
                      maxWidth: 200,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {profile
                      ? `${profile.name.last}, ${profile.name.first} ${profile.name.middle
                          ?.split(' ')
                          ?.map((name) => name[0])
                          ?.join()}.`
                      : 'User Name'}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: 'lowercase',
                      color: 'text.secondary',
                      textAlign: 'left',
                    }}
                  >
                    {profile?.email || ''}
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              {profileSettings.map(({ category, options }, index) => (
                <Stack
                  key={category + index}
                  sx={{
                    p: 1,
                  }}
                >
                  {!!category && (
                    <Typography
                      sx={{
                        px: 2,
                        py: 1,
                      }}
                    >
                      {category}
                    </Typography>
                  )}
                  {options.map((option, idx) => (
                    <MenuItem
                      onClick={option.onClick}
                      key={option.label + idx}
                      sx={{
                        borderRadius: 1,
                      }}
                    >
                      <Stack flexDirection="row" alignItems="center" gap={2}>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            height: 18,
                            width: 18,
                          }}
                        >
                          {cloneElement(option.icon, {
                            size: 18,
                          })}
                        </Stack>
                        <Typography variant="body2">{option.label}</Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                  {index !== profileSettings.length - 1 && <Divider />}
                </Stack>
              ))}
              <Divider />
              <Box
                sx={{
                  p: 1,
                }}
              >
                <Button
                  fullWidth
                  disableElevation
                  disableFocusRipple
                  disableRipple
                  disableTouchRipple
                  sx={{
                    borderRadius: 0,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    p: 0.5,
                    color: 'text.primary',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'background.50',
                    },
                  }}
                  onClick={() => dispatch(setLogout())}
                >
                  <Typography variant="body2">Logout</Typography>
                </Button>
              </Box>
            </Popover>
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default DashboardLayoutHeader;
