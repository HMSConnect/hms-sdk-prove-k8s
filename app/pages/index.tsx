import * as React from 'react'

import environment from '@environment'
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  makeStyles,
  Paper,
} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import RouteManager from '@routes/RouteManager'
import * as _ from 'lodash'
import getConfig from 'next/config'
import routes from '../routes'

const URL = 'ws://localhost:3003'

const config = getConfig()
const staticFolder = _.get(config, 'publicRuntimeConfig.staticFolder')
const useStyles = makeStyles(theme => ({
  card: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 360,
    width: '100%',
  },
  root: {
    marginTop: 18,
    width: '100%',
  },
}))

function ListItemLink(props: any) {
  return <ListItem button component='a' {...props} />
}

class AppComponent extends React.Component {

  ws = new WebSocket(URL)
  state = {
    messages:[],
    time:'YYYY-MM-DD HH:mm:ss:zzz'
  }

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message:String = evt.data//JSON.parse(evt.data)
      console.log(message);

      // const msg:Array<String> = [...this.state.messages];
      // msg.push(message);
      // this.setState({ messages:msg })

      this.setState({ time:message })
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }
  }

  routeNavigate(routeName: string) {
    const path = RouteManager.getPath(routeName)
    routes.Router.pushRoute(routeName)
  }

  render() {
    
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid
          // className={classes.root}
          container
          direction='row'
          justify='center'
          alignItems='center'
        >
          {/* <Paper className={classes.card}> */}
          {/* <Paper> */}
          {
            // this.state.messages.map((v,i) => {
            //   return (
            //     <p key={i}>{v}</p>
            //   )
            // })
            <p>{this.state.time}</p>

          }
          {/* </Paper> */}
        </Grid>
      </React.Fragment>
    )
  }
}

export default function App(props:any) {

  return (
    <AppComponent {...props}/>
  )
}
