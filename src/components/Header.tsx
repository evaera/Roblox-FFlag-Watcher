import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React, { Component } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Page } from '../App'
import styles from './Header.module.scss'

interface HeaderProps extends RouteComponentProps<any> {
  pages: Page[]
}

class Header extends Component<HeaderProps> {
  render () {
    return (
      <AppBar color='primary' position='static' style={{
        flexGrow: 1
      }}>
        <Toolbar>
          <Typography variant='h6'>
            Roblox FFlag Watcher
          </Typography>
        </Toolbar>
        <Tabs value={this.props.pages.findIndex(page => (
          page.path === '/'
            ? this.props.location.pathname === '/'
            : this.props.location.pathname.includes(page.activePath || page.path)
        ))}>
          {this.props.pages.map(page => (
            <Tab
              label={page.title}
              onClick={() => this.props.history.push(page.activePath || page.path)}
              key={page.path}
            />
          ))}
          <Tab label='Discord channel' onClick={() => window.open('https://discord.gg/7UGTwKs', '_blank')} />
        </Tabs>
      </AppBar>
    )
  }
}

export default withRouter(Header)
