import { Color, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import Flag from '@material-ui/icons/Flag';
import List from '@material-ui/icons/List';
import LooksOne from '@material-ui/icons/LooksOne';
import SettingsRemote from '@material-ui/icons/SettingsRemote';
import Sync from '@material-ui/icons/Sync';
import TextFormat from '@material-ui/icons/TextFormat';
import memoize from 'fast-memoize';
import React from 'react';

const typeStyles: [string, Color, JSX.Element][] = [
  ['Dynamic Int', red, <LooksOne />],
  ['Dynamic String', red, <TextFormat />],
  ['Dynamic Log', red, <List />],
  ['Int', indigo, <LooksOne />],
  ['Log', indigo, <List />],
  ['String', indigo, <TextFormat />],
  ['Synced', blue, <Sync />],
  ['Dynamic', deepOrange, <SettingsRemote />],
  ['Flag', teal, <Flag />]
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
