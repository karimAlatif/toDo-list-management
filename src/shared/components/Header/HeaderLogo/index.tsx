import React from 'react';
import clsx from 'clsx';
import {Box} from '@material-ui/core';
import Logo from 'shared/assets/SiWareLogo.svg';
import {useStyles} from './styles';

export default function HeaderLogo() {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center" className={clsx(classes.root)}>
      <Box
        display={'flex'}
        alignItems={'center'}
        className={classes.homeButton}
        color="inherit"
        aria-label="open drawer"
      >
        <img
          alt=""
          src={
            'https://upload.wikimedia.org/wikipedia/ar/thumb/b/be/%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A9_%D9%84%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86_2023.svg/2560px-%D8%B4%D8%B9%D8%A7%D8%B1_%D8%A7%D9%84%D8%AA%D8%B9%D8%A7%D9%88%D9%86%D9%8A%D8%A9_%D9%84%D9%84%D8%AA%D8%A3%D9%85%D9%8A%D9%86_2023.svg.png'
          }
          className={classes.logo}
        />
      </Box>
    </Box>
  );
}
