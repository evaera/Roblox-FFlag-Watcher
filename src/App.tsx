import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import React, { Component, ComponentClass } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import About from './pages/About'
import Browser from './pages/Browser'
import History from './pages/History'

export const theme = createMuiTheme({
  typography: {
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#ab47bc'
    },
    secondary: {
      main: '#f48fb1'
    }
  }
})

export interface Page {
  path: string,
  component: ((...args: any[]) => JSX.Element) | ComponentClass,
  title: string
  activePath?: string
}

const pages: Page[] = [
  {
    path: '/',
    component: Browser,
    title: 'Browser'
  },
  {
    path: '/history/:series?/:flag?',
    activePath: '/history',
    component: History,
    title: 'History'
  },
  {
    path: '/about',
    component: About,
    title: 'About'
  }
]

class App extends Component {
  render () {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header pages={pages} />
          {pages.map(page => (
            <Route
              exact={page.path === '/'}
              path={page.path}
              component={page.component}
              key={page.path}
            />
          ))}
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
