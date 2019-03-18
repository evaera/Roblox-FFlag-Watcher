import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import MUIDataTable from 'mui-datatables'
import React, { Component, Fragment } from 'react'
import Moment from 'react-moment'
import { Flag, allSeries } from '../api'
import { getFlagType } from '../Util'
import FFlagTypeChip from './FFlagTypeChip'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { FFlagDataCallbacks } from './FFlagData'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'

export interface FFlagTableProps {
  flags: Flag[]
  series: string
}

const columns = (props: FFlagTableProps) => [
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
            (p: any) => <RouterLink to={`/history/${props.series}/${flag}`} {...p} />
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

export default class FFlagTable extends Component<FFlagTableProps & FFlagDataCallbacks> {
  render () {
    return (
      <MUIDataTable
        title='Fast Flags'
        data={this.props.flags.map(flag => {
          const { type } = getFlagType(flag.flag)

          return [
            type || '',
            flag.flag,
            flag.flag,
            flag.currentValue || '',
            flag.lastUpdated ? new Date(flag.lastUpdated).toISOString() : ''
          ]
        })}
        columns={columns(this.props) as any}
        options={{
          selectableRows: false,
          rowsPerPage: 30,
          rowsPerPageOptions: [10, 30, 50, 100, 300, 500, 1000, Infinity],
          print: false,
          filterType: 'multiselect',
          customToolbar: () => (
            <Fragment>
              <IconButton onClick={this.props.refresh}>
                <RefreshIcon />
              </IconButton>
              <FormControl style={{
                marginLeft: 10
              }}>
                <InputLabel htmlFor='series'>Platform/Application</InputLabel>
                <Select
                  value={this.props.series}
                  onChange={(e) => this.props.setSeries(e.target.value)}
                  input={
                    <Input name='series' id='series' />
                  }
                >
                {allSeries.map((series) => (
                  <MenuItem value={series}>{series}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Fragment>
          )
        }}
      />
    )
  }
}
