import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import RefreshIcon from '@material-ui/icons/Refresh'
import MUIDataTable from 'mui-datatables'
import React, { Component, Fragment } from 'react'
import Moment from 'react-moment'
import { allSeries, Flag } from '../api'
import { getFlagType } from '../Util'
import { FFlagDataCallbacks } from './FFlagData'
import FFlagTextLink from './FFlagTextLink'
import FFlagTypeChip from './FFlagTypeChip'

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
      customBodyRender: (flag: string) => FFlagTextLink(flag, props.series)
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
          selectableRows: "none",
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
