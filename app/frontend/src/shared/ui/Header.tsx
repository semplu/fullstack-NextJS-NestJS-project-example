'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PublicIcon from '@mui/icons-material/Public';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/shared/lib/auth';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactElement;
  action?: () => void;
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  console.log('Header render, loading:', loading, 'user:', user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleHomeClick = () => {
    router.push('/');
  };

  const navItemsLeft: NavItem[] = [
    { label: 'Countries', path: '/countries', icon: <PublicIcon /> },
  ];
  const navItemsRight: NavItem[] = user
    ? [{ label: 'Logout', path: '#', action: handleLogout, icon: <LogoutIcon /> }]
    : [
      { label: 'Login', path: '/login', icon: <LoginIcon /> },
      { label: 'Registration', path: '/register', icon: <PersonAddIcon /> },
    ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }} onClick={handleHomeClick} style={{ cursor: 'pointer' }}>
        My App
      </Typography>
      <List>
        {[...navItemsLeft, ...navItemsRight].map((item) => (
          <ListItem
            key={item.label}
            onClick={() => (item.action ? item.action() : handleNavigation(item.path))}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 2, cursor: 'pointer' }}
            onClick={handleHomeClick}
          >
            My App
          </Typography>
          {loading ? null : (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItemsLeft.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => handleNavigation(item.path)}
                  sx={{ mx: 1 }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        {loading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItemsRight.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                startIcon={item.icon}
                onClick={() => (item.action ? item.action() : handleNavigation(item.path))}
                sx={{ mx: 1 }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
      {!loading && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </AppBar>
  );
}
