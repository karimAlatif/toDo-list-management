import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    zIndex: 10,
    position: 'relative',
    transition: 'all 0.2s',
  },
  homeButton: {
    marginRight: theme.spacing(4),
    cursor: 'default',
    '&:hover': {
      background: 'transparent',
    },
  },
  logo: {
    width: 135,
    marginLeft: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
}));
