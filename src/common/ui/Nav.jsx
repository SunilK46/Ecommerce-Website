import React, { useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Box, IconButton, Button,
  InputBase, Select, MenuItem, useTheme, alpha, Badge
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../cart/slice_cart/Cart-Thunks';
import { calculateTotals } from '../../cart/slice_cart/CartSlice';

const NavBar = ({ mode, toggleMode }) => {
    const theme = useTheme();
  const dispatch = useDispatch();
  
  const { totalQuantity } = useSelector(state => state.cart);

  useEffect(() => {
    dispatch(fetchCart()).then(() => {
      dispatch(calculateTotals());
    });
  }, [dispatch]);

 

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: 2,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: { xs: 1, sm: 2 },
          px: { xs: 1, sm: 3 },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'inherit',
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
          }}
        >
          🛍️ FLYBUY 
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : alpha(theme.palette.common.white, 0.08),
            px: 1,
            borderRadius: 2,
            flexGrow: 1,
            maxWidth: { xs: '100%', sm: 400, md: 500 },
            order: { xs: 3, sm: 2 },
          }}
        >
         
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1 },
            flexShrink: 0,
            order: { xs: 2, sm: 3 }, 
          }}
        >
       
          <Button
            component={Link}
            to="/add-product"
            color="inherit"
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              px: { xs: 1, sm: 2 },
              textTransform: 'none',
              border: `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
              borderRadius: 2,
              '&:hover': { backgroundColor: alpha(theme.palette.text.primary, 0.05) },
            }}
          >
            Add
          </Button>

          <IconButton
            component={Link}
            to="/cart"
            color="inherit"
            aria-label="shopping cart"
            sx={{ p: { xs: 0.5, sm: 1 } }}
          >
            <Badge 
              badgeContent={totalQuantity} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.7rem',
                  height: '18px',
                  minWidth: '18px',
                }
              }}
            >
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={toggleMode}
            aria-label="toggle light/dark mode"
            sx={{ p: { xs: 0.5, sm: 1 } }}
          >
            {mode === 'light' ? (
              <Brightness4Icon fontSize="small" />
            ) : (
              <Brightness7Icon fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;