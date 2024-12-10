import React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton, Tooltip, Box} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language'; // Import Language icon
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: 8,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  buttonArabic: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: 8,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
}));

const LanguageSwitcher: React.FC = () => {
  const {i18n} = useTranslation();
  const classes = useStyles();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang); // Change language
  };

  return (
    <Box className={classes.container}>
      <Tooltip title="Switch to English" aria-label="Switch to English">
        <IconButton
          onClick={() => handleLanguageChange('en')}
          size="small"
          className={classes.button}
        >
          {'EN'}
        </IconButton>
      </Tooltip>

      <Tooltip title="التبديل إلى العربية" aria-label="Switch to Arabic">
        <IconButton
          onClick={() => handleLanguageChange('ar')}
          size="small"
          className={classes.buttonArabic}
        >
          {'AR'}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default LanguageSwitcher;
