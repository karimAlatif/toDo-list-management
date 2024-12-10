import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  dropContainer: {
    '&:not($container)': {
      height: '77vh',
      overflow: 'auto',

      '&::-webkit-scrollbar': {
        width: 5,
      },

      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[800],
        borderRadius: 20,
      },
    },

    '&.dragOver': {
      backgroundColor: '#eee',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column', // Stack the columns vertically on small screens
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
    },
  },
  column: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: '100%', // Make the columns take full width on small screens
      margin: theme.spacing(1, 0), // Adjust margin for vertical stacking
    },
    [theme.breakpoints.up('sm')]: {
      width: '18.5vw',
      marginRight: '0.5rem',
      display: 'flex',
      flexDirection: 'column',
      background: 'rgba(50, 71, 92, 0.04)',
      borderRadius: '16px 16px 0px 0px',
      padding: theme.spacing(0, 1.5),
    },
    '& .task-drop': {
      padding: 5,
      marginTop: '32px !important',
      marginBottom: '16px',
    },
    '& .card': {
      // border: '1px solid lightgray',
      marginBottom: theme.spacing(1),
      backgroundColor: '#fff',
      // padding: theme.spacing(1),
      padding: '20px 16px',
      borderRadius: 16,
      boxShadow:
        ' 0px 1px 6px 2px rgba(50, 71, 92, 0.06), 0px 2px 6px 1px rgba(50, 71, 92, 0.04), 0px 1px 4px 2px rgba(50, 71, 92, 0.02)',
      '& .name': {
        color: '#32475CDE',
        fontWeight: 700,
      },
      '& .icon': {
        width: 17,
        height: 17,
        color: '#32475C8A',
        marginRight: 8,
      },
      '& .text': {
        color: '#32475C99',
      },
    },
  },
  title: {
    margin: theme.spacing(1.5),
    textTransform: 'capitalize',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'rgba(50, 71, 92, 0.87)',
    position: 'relative',
    '& .total-tasks': {
      width: 25,
      height: 25,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#E0E0E0',
      color: 'rgba(50, 71, 92, 0.87)',
      borderRadius: '50%',
      fontWeight: 'bold',
      marginLeft: theme.spacing(1.5),
    },
    '& .dot': {
      width: '8px',
      height: '8px',
      borderRadius: '8px',
      marginRight: '10px',
      '&.column-1': {
        background: '#6cbaf2',
      },
      '&.column-2': {
        background: '##89d177',
      },
      '&.column-3': {
        background: '#ec695c',
      },
    },
    '&:after': {
      width: '100%',
      height: '4px',
      content: "''",
      position: 'absolute',
      bottom: '-11px',
    },
    '&.column-1': {
      '&:after': {
        background: '#6cbaf2',
      },
    },
    '&.column-2': {
      '&:after': {
        background: '#89d177',
      },
    },
    '&.column-3': {
      '&:after': {
        background: '#ec695c',
      },
    },
  },
  mr1: {
    marginRight: theme.spacing(1),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  mr6: {
    marginRight: theme.spacing(6),
  },
  mr5: {
    marginRight: theme.spacing(5),
  },
  select: {
    '& legend': {
      '&[class*="PrivateNotchedOutline-legendNotched"]': {
        visibility: 'visible',
      },
    },
  },
  checkbox: {
    padding: '10px 0px',
    marginRight: '10px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  avatar: {
    marginRight: '8px',
    borderRadius: '30%',
    transition: 'opacity 0.3s ease',
  },

  searchBox: {
    // height: '40px',
  },
  btn: {
    height: '38px',
    borderRadius: '6px',
  },
  cancelButton: {
    border: '1px solid rgba(255, 77, 73, 0.5)',
    color: '#FF3E1D ',
    background: 'rgba(255, 77, 73, 0.05)',
  },
  actionContainer: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: theme.spacing(2), // Consistent spacing between buttons
  },
  button: {
    textTransform: 'none', // Avoid uppercase transformation for better readability
    padding: '8px 16px',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.875rem', // Smaller font for smaller screens
    },
  },
}));
