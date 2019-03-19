import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import yellow from '@material-ui/core/colors/yellow'
import Add from '@material-ui/icons/Add'
import Edit from '@material-ui/icons/Edit'
import Remove from '@material-ui/icons/Remove'
import memoize from 'fast-memoize'
import React from 'react'

const typeStyles: [string, typeof blue, JSX.Element][] = [
  ['Created', green, <Add />],
  ['Changed', yellow, <Edit />],
  ['Removed', red, <Remove />]
]

const getColor = (name: string) => (typeStyles.find(([color]) => name.includes(color)) || [])[1]

const getIcon = (name: string) => (typeStyles.find(([color]) => name.includes(color)) || [])[2]

const makeTheme = memoize((theme: any) => createMuiTheme(theme))

export default function LifecycleChip (type: string) {
  return type && type.length > 0 ?
    <MuiThemeProvider theme={makeTheme({
      typography: {
        useNextVariants: true
      },
      palette: {
        primary: getColor(type) || {
          main: '#ccc'
        }
      }
    })}>
      <Chip
        label={type}
        color='primary'
        icon={getIcon(type)}
      />
    </MuiThemeProvider>
  : ''
}
