import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  mainTabs: {
    minWidth: 250,
    borderRadius: 10,
    background: '#F6F6F6',
    padding: theme.spacing(3, 0),
    textAlign: 'center',
    '& .header': {
      textAlign: 'left',
      marginLeft: theme.spacing(1),
    },
  },
  tab: {
    textAlign: 'left',
    padding: theme.spacing(1, 5),
    cursor: 'pointer',
    '&.selected': {
      background: '#E9E9E9',
    },
    '&.disabled': {
      pointerEvents: 'none',
      cursor: 'default',
    },
  },
  tabContent: {
    margin: theme.spacing(0, 3),
    width: '100%',
  },
  userWorkOrder: {
    position: 'relative',
    '&:before': {
      content: "''",
      position: 'absolute',
      background: '#333',
      width: 5,
      height: 5,
      left: -12,
      top: '50%',
      borderRadius: 5,
    },
    '&.conflict': {
      color: 'red',
    },
  },
  skillWrapper: {
    maxHeight: 65,
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    '&::-webkit-scrollbar': {
      width: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[800],
      borderRadius: 20,
    },
  },
  skill: {
    padding: '2px 5px',
    borderRadius: 10,
    border: '1px solid #666',
    margin: 3,
  },
  mr4: {
    marginRight: theme.spacing(4),
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  hint: {
    position: 'absolute',
    top: 50,
  },
}));
