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
import Typography from '@material-ui/core/Typography'
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
    display: 'flex',
    width: '100%',
  },
}))

function ListItemLink(props: any) {
  return <ListItem button component='a' {...props} />
}

interface IProps {
  classes: {
    card: string,
    root: string
  }
}

class AppComponent extends React.Component<IProps> {

  ws = new WebSocket(URL)
  state = {
    messages:[],
    time:'YYYY-MM-DD HH:mm:ss:zzz',
    maxGap:0,
    previous:'',
    gap:0
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
      const message:string = evt.data//JSON.parse(evt.data)
      console.log(message);

      // const msg:Array<String> = [...this.state.messages];
      // msg.push(message);
      // this.setState({ messages:msg })

      const gap:number = Date.parse(message) - Date.parse(this.state.previous)
      console.log('Gap:', gap);

      this.setState({ time:message }, () => {
        this.setState({ 
          gap: gap,
          previous: this.state.time,
          // maxGap: gap > this.state.maxGap ? gap : this.state.maxGap
        })
      })
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

    const { classes } = this.props
    
    return (
      <React.Fragment>
        <CssBaseline />
        <Grid
          container
          spacing={2}
          style={{ minHeight: '100vh', maxWidth: '100%' }}
        >
          <Grid item xs={12} style={{ alignSelf:'center', textAlign:'center' }}>
            <Typography variant='h4'><strong>{this.state.time}</strong></Typography>
            <Typography variant='body2'>
              <strong>{`Gap: ${this.state.gap} milliseconds`}</strong>
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default function App(props:any) {
  const classes = useStyles();

  return (
    <AppComponent classes={classes} {...props}/>
  )
}
