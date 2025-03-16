import React, { useMemo } from 'react';
import { AppBar, Toolbar, Typography, Container, Breadcrumbs } from '@mui/material';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Header = () => {
  const breadcrumbs = useSelector((state: RootState) => state.breadcrumbs.items);
  
  const linkStyles = {
    textDecoration: 'none',
    color: 'text.secondary',
    fontWeight: 400,
    '&:hover': {
      color: 'primary.main',
    },
  };

  const breadcrumbsSection = useMemo(() => {
    if (breadcrumbs.length === 0) {
      return (
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            ...linkStyles,
            color: 'text.primary',
            fontWeight: 500,
          }}
        >
          Overview
        </Typography>
      );
    }

    return (
      <Breadcrumbs aria-label="breadcrumb" separator=">">
        <Typography
          component={Link}
          to="/"
          sx={linkStyles}
        >
          Overview
        </Typography>
        
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return isLast ? (
            <Typography key={index} color="text.primary" fontWeight={500}>
              {crumb.label}
            </Typography>
          ) : (
            <Typography
              key={index}
              component={Link}
              to={crumb.path || '#'}
              sx={linkStyles}
            >
              {crumb.label}
            </Typography>
          );
        })}
      </Breadcrumbs>
    );
  }, [breadcrumbs]);

  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0} 
      sx={{ borderBottom: '1px solid #e0e0e0' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {breadcrumbsSection}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default React.memo(Header);