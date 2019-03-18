import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import blue from '@material-ui/core/colors/blue'
import deepOrange from '@material-ui/core/colors/deepOrange'
import indigo from '@material-ui/core/colors/indigo'
import red from '@material-ui/core/colors/red'
import teal from '@material-ui/core/colors/teal'
import Code from '@material-ui/icons/Code'
import List from '@material-ui/icons/List'
import LooksOne from '@material-ui/icons/LooksOne'
import SettingsRemote from '@material-ui/icons/SettingsRemote'
import TextFormat from '@material-ui/icons/TextFormat'
import ToggleOn from '@material-ui/icons/ToggleOn'
import React from 'react'
import memoize from 'fast-memoize'

const typeStyles: [string, typeof blue, JSX.Element][] = [
  ['Dynamic Int', red, <LooksOne />],
  ['Dynamic String', red, <TextFormat />],
  ['Int', indigo, <LooksOne />],
  ['Log', indigo, <List />],
  ['String', indigo, <TextFormat />],
  ['Studio', blue, <Code />],
  ['Dynamic', deepOrange, <SettingsRemote />],
  ['Flag', teal, <ToggleOn />]
]

const getColor = (name: string) => (typeStyles.find(([color]) => name.includes(color)) || [])[1]

const getIcon = (name: string) => (typeStyles.find(([color]) => name.includes(color)) || [])[2]

const makeTheme = memoize((theme: any) => createMuiTheme(theme))

export default function FFlagTypeChip (type: string) {
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
