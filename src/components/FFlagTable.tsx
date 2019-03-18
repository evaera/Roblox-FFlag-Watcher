import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import MUIDataTable from 'mui-datatables'
import React, { Component } from 'react'
import Moment from 'react-moment'
import { Flag } from '../api'
import { getFlagType } from '../Util'
import FFlagTypeChip from './FFlagTypeChip'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'

interface FFlagTableProps {
  flags: Flag[]
  refresh: () => any
}

const columns = [
  {
    name: 'Type',
    options: {
      customBodyRender: FFlagTypeChip,
      download: false
    }
  },
  {
    name: 'Flag',
    options: {
      filter: false,
      download: false,
      customBodyRender: (flag: string) => (
        <Link
          component={
            (props: any) => <RouterLink to={`/history/${flag}`} {...props} />
          }
          color='inherit'
          underline='none'
          style={{
            fontSize: 14,
            borderBottom: '1px dotted silver'
          }}
        >
          {getFlagType(flag).name}
        </Link>
      )
    }
  },
  {
    name: 'Full Name',
    options: {
      filter: false,
      display: false,
      searchable: true
    }
  },
  {
    name: 'Value',
    options: {
      customBodyRender: (value: string) => (
        <Typography noWrap={true} style={{
          fontFamily: 'monospace',
          fontSize: 14,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        }}>{value}</Typography>
      ),
      filterOptions: ['True', 'False']
    }
  },
  {
    name: 'Last Changed',
    options: {
      filter: false,
      sortDirection: 'desc',
      searchable: false,
      customBodyRender: (value: string) => (
        value.length > 0
          ? <Tooltip title={new Date(value).toLocaleString()}>
              <Moment fromNow>{value}</Moment>
            </Tooltip>
          : <Tooltip title='Created before tracking began'>
              <Typography style={{
                color: 'silver'
              }}>unknown</Typography>
            </Tooltip>
      )
    }
  }
]

export default class FFlagTable extends Component<FFlagTableProps> {
  render () {
    return (
      <MUIDataTable
        title='Flags'
        data={this.props.flags.map(flag => {
          const { type } = getFlagType(flag.flag)

          return [
            type || '',
            flag.flag,
            flag.flag,
            flag.currentValue || '',
            flag.lastUpdated || ''
          ]
        })}
        columns={columns as any}
        options={{
          selectableRows: false,
          rowsPerPage: 30,
          rowsPerPageOptions: [10, 30, 50, 100, 300, 500, 1000, Infinity],
          print: false,
          filterType: 'multiselect',
          customToolbar: () => (
            <IconButton onClick={this.props.refresh}>
              <RefreshIcon />
            </IconButton>
          )
        }}
      />
    )
  }
}
