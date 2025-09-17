import {
  AppBar,
  Stack,
  Drawer,
  IconButton,
  Button,
  Typography,
  Divider,
  Box,
  Collapse,
  Popover,
  useTheme,
} from '@mui/material';
import chroma from 'chroma-js';
import { TbArrowBarToLeft, TbArrowBarToRight, TbChevronRight } from 'react-icons/tb';

import useDashboard, { useSidebarOptions, type iSidebarOptions } from '../../hooks/dashboard.hook';
import { useBreakpoint } from '../../theme';
import Logo from '../../components/logo.component';
import { cloneElement, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const drawerWidth = 240;

export const DashboardLayoutSidebarToggle = () => {
  const { collapsed, setCollapsed } = useDashboard();

  return (
    <IconButton
      sx={{
        border: ' solid 1px',
        borderColor: (theme) => theme.palette.divider,
        p: 1,
      }}
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? <TbArrowBarToRight size={18} /> : <TbArrowBarToLeft size={18} />}
    </IconButton>
  );
};

const SidebarSubmenu = ({
  submenu,
  url,
}: {
  submenu: iSidebarOptions[number]['options'][number]['submenu'];
  url: string;
}) => {
  const { collapsed } = useDashboard();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  if (!submenu || submenu.length === 0) return null;

  return (
    <Stack pl={collapsed ? 0 : 2.5}>
      {submenu?.length > 0 &&
        submenu?.map((menu, i) => (
          <Stack flexDirection="row" key={menu.title + i}>
            {!collapsed && (
              <Box
                component={motion.div}
                layoutId={`menu-border-${i}`}
                initial={{ y: i === 0 ? -1 : -20 }}
                animate={{
                  borderColor:
                    location.pathname === menu.url
                      ? theme.palette.primary.main
                      : theme.palette.divider,
                }}
                transition={{
                  duration: 0.4,
                  ease: 'easeInOut',
                }}
                sx={{
                  width: 12,
                  height: i === 0 ? 20 : 40,
                  borderBottomLeftRadius: i !== submenu.length - 1 ? 0 : 6,
                  borderLeft: '2px solid',
                  borderBottom: '2px solid',
                  borderColor: theme.palette.divider, // default so MUI doesn't complain
                }}
              />
            )}

            <Button
              key={menu.title}
              sx={[
                {
                  flex: 1,
                  justifyContent: 'flex-start',
                  textTransform: 'none',
                  color: (theme) => theme.palette.text.secondary,
                  height: 40,
                },
                location.pathname === menu.url && {
                  bgcolor: (theme) =>
                    chroma(theme.palette.primary.main)
                      .alpha(!collapsed ? 0.05 : 0.1)
                      .css(),
                  color: 'primary.main',
                  fontWeight: 600,
                },
              ]}
              onClick={() => navigate(url + menu.url)}
            >
              {menu.title}
            </Button>
          </Stack>
        ))}
    </Stack>
  );
};

const SidebarOptions = ({ option }: { option: iSidebarOptions[number]['options'][number] }) => {
  const [openSubmenu, setOpenSubmenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { collapsed } = useDashboard();
  const location = useLocation();
  const navigate = useNavigate();

  const isURL = !!(
    option.url === location.pathname ||
    ('alternativeLinks' in option ? option.alternativeLinks : [])?.includes(location.pathname) ||
    (option.submenu || []).some((sub) => sub.url === location.pathname)
  );

  return (
    <Stack key={option.title}>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        elevation={0}
        PaperProps={{
          sx: {
            border: (theme) => `1px solid ${theme.palette.divider}`,
            backgroundColor: 'background.default',
            ml: 7,
            borderRadius: 2,
            p: 2,
            minWidth: 200,
          },
        }}
      >
        <SidebarSubmenu submenu={option?.submenu} url={option.url} />
      </Popover>

      {!collapsed ? (
        <Button
          component={motion.div}
          layoutId={`sidebar-button-${option.title}`}
          variant="contained"
          sx={[
            {
              borderRadius: 2,
              height: 40,
              justifyContent: 'flex-start',
              bgcolor: 'transparent',
              color: 'text.primary',
            },
            isURL && {
              bgcolor: (theme) => chroma(theme.palette.primary.main).alpha(0.1).css(),
              color: 'primary.main',
            },
          ]}
          endIcon={
            option.submenu && option.submenu.length > 0 ? (
              <Stack
                component={motion.div}
                animate={{ rotate: openSubmenu ? 90 : 0 }}
                alignItems="center"
                justifyContent="center"
                sx={{ width: 16, height: 16 }}
              >
                <TbChevronRight size={16} />
              </Stack>
            ) : undefined
          }
          onClick={() =>
            option.submenu && option.submenu.length > 0
              ? setOpenSubmenu(!openSubmenu)
              : navigate(option.url)
          }
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack flexDirection="row" alignItems="center" gap={1.5}>
              <Stack
                component={motion.div}
                alignItems="center"
                justifyContent="center"
                layoutId={`sidebar-icon-${option.title}`}
                initial={{ height: 16, width: 16 }}
              >
                {cloneElement(isURL ? option.activeIcon || option.icon : option.icon, {
                  size: 16,
                })}
              </Stack>
              {!collapsed && (
                <Typography
                  fontWeight={isURL ? 700 : 400}
                  sx={{
                    textTransform: 'capitalize',
                    fontSize: '.875rem',
                  }}
                >
                  {option.title}
                </Typography>
              )}
            </Stack>
            {!!option.endIcon && cloneElement(option.endIcon)}
          </Stack>
        </Button>
      ) : (
        <IconButton
          component={motion.div}
          layoutId={`sidebar-button-${option.title}`}
          sx={[
            {
              borderRadius: 2,
              height: 40,
              width: 40,
            },
            isURL && {
              bgcolor: (theme) => chroma(theme.palette.primary.main).alpha(0.1).css(),
              color: 'primary.main',
            },
          ]}
          onClick={(e) =>
            option.submenu && option.submenu.length > 0 ? handleClick(e) : navigate(option.url)
          }
        >
          <Stack
            component={motion.div}
            alignItems="center"
            justifyContent="center"
            layoutId={`sidebar-icon-${option.title}`}
            initial={{ height: 16, width: 16 }}
          >
            {cloneElement(isURL ? option.activeIcon || option.icon : option.icon, {
              size: 16,
            })}
          </Stack>
        </IconButton>
      )}
      <Collapse in={!!option.submenu && openSubmenu && !collapsed} unmountOnExit>
        <SidebarSubmenu submenu={option?.submenu} url={option.url} />
      </Collapse>
    </Stack>
  );
};

const SidebarCategories = ({
  title,
  options,
}: {
  title: iSidebarOptions[number]['title'];
  options: iSidebarOptions[number]['options'];
}) => {
  const { collapsed } = useDashboard();

  return (
    <Stack key={title} gap={1.5} mb={2}>
      <AnimatePresence initial={false} mode="wait">
        {title &&
          (!collapsed ? (
            <Box
              component={motion.div}
              initial={{ width: 0, overflowX: 'hidden' }}
              animate={{ width: 'auto' }}
              exit={{ width: 0 }}
            >
              <Typography
                fontSize=".75rem"
                fontWeight={600}
                sx={{ opacity: 0.5, textTransform: 'uppercase', textWrap: 'nowrap' }}
              >
                {title}
              </Typography>
            </Box>
          ) : (
            <Divider />
          ))}
      </AnimatePresence>
      {options.map((option) => {
        return <SidebarOptions key={option.title} option={option} />;
      })}
    </Stack>
  );
};

const DashboardLayoutSidebarContent = () => {
  const { collapsed } = useDashboard();
  const sidebarOptions = useSidebarOptions();

  return (
    <Stack sx={{ minHeight: '100dvh' }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          height: 64,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent={'space-between'}
          sx={{ p: 2, height: '100%' }}
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ height: 40, width: !collapsed ? 'auto' : 40 }}
          >
            <Logo withText={!collapsed} logoContainerSize={32} />
          </Stack>
          {!collapsed && <DashboardLayoutSidebarToggle />}
        </Stack>
      </AppBar>
      <Stack
        flexGrow={1}
        sx={{ p: collapsed ? 1.5 : 2, py: 2, overflowY: 'auto', bgcolor: 'background.paper' }}
      >
        {sidebarOptions.map((options) => {
          return (
            <SidebarCategories
              key={options.title}
              title={options?.title}
              options={options.options}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const DashboardLayoutSidebar = () => {
  const { breakpoint } = useBreakpoint();
  const { collapsed, setCollapsed } = useDashboard();

  return (
    <Drawer
      variant={breakpoint === 'xs' ? 'temporary' : 'permanent'}
      anchor="left"
      open={breakpoint === 'xs' ? !collapsed : true}
      onClose={breakpoint === 'xs' ? () => setCollapsed(false) : undefined}
      ModalProps={breakpoint === 'xs' ? { keepMounted: true } : undefined}
      sx={[
        {
          width: collapsed ? 64 : drawerWidth,
          flexShrink: 0,
          display: 'block',
          transition: 'width 0.3s ease-in-out',
          [`& .MuiDrawer-paper`]: {
            width: collapsed ? 64 : drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.default',
            transition: 'width 0.3s ease-in-out',
          },
        },
        breakpoint === 'xs' && {
          width: '100vw',
          transition: 'none',
          [`& .MuiDrawer-paper`]: {
            width: '100vw',
            transition: 'none',
          },
        },
      ]}
    >
      <DashboardLayoutSidebarContent />
    </Drawer>
  );
};

export default DashboardLayoutSidebar;
