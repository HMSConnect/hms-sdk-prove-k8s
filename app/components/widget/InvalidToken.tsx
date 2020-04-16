import * as React from 'react'

import {
  Button,
  createStyles,
  Icon,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core'
import RouteManager from '@routes/RouteManager'
import AuthService from '@services/AuthService'
import clsx from 'clsx'
import routes from '../../routes'
// import test from '../../static/images'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '20em',
      margin: theme.spacing(1),
      padding: theme.spacing(2),
      width: 500,
    },
    fullWidth: {
      width: '100%',
    },
    root: {
      // alignItems: 'center',
      // backgroundColor: '#64b5f6',
      // backgroundImage: "url('../../assets/login-bg.jpg')",
      backgroundImage: `linear-gradient(to bottom, rgba(102,178,222,0.6) 0%,rgba(255,255,255,0.65) 100%), url(../../static/images/login-bg.jpg)`,
      // backgroundImage: `linear-gradient(red, yellow), url(../../static/images/login-bg.jpg)`,
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
    },

    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  }),
)

const InvalidToken: React.FunctionComponent<any> = () => {
  const classes = useStyles()

  const [authData, setAuthData] = React.useState({
    password: '',
    username: '',
  })
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await AuthService.login(authData, () => {
      const path = RouteManager.getPath('/')
      routes.Router.pushRoute(path)
    })
  }
  
  return (
    <div className={classes.root}>
      <Paper className={classes.cardContainer} elevation={5}>
        <Typography
          variant='h6'
          component='div'
          style={{ flex: 2, textAlign: 'center' }}
        >
          HMS Widget
        </Typography>
        <form
          onSubmit={onSubmit}
          noValidate
          className={classes.formContainer}
          style={{ flex: 4 }}
        >
          <Typography
            variant='h6'
            component='div'
            style={{ flex: 2, textAlign: 'center' }}
          >
            Invalid token
          </Typography>

          <Typography
            style={{ paddingLeft: '8px', color: 'red' }}
            component='span'
            variant='body2'
          >
            Invalid token or token expired, please login again or refresh this page.
          </Typography>

          {/* <Button
            type='submit'
            variant='contained'
            color='primary'
            data-testid='submit-login-page'
          >
            <Icon className={clsx('fas fa-sign-in-alt')} />
            <Typography
              style={{ paddingLeft: '8px' }}
              component='span'
              variant='body2'
            >
              Login
            </Typography>
          </Button> */}
        </form>
      </Paper>
    </div>
  )
}

export default Login
