import React, { Component } from 'react'
import { getFlags, Flag, allSeries } from '../api'
import { LinearProgress } from '@material-ui/core'
import { FFlagTableProps } from './FFlagTable'

export interface FFlagDataCallbacks {
  refresh: () => any
  setSeries: (series: string) => any
}

interface FFlagDataProps {
  children: (options: FFlagTableProps & FFlagDataCallbacks) => JSX.Element
}

interface FFlagDataState {
  flags?: Flag[]
  series: string
}

export default class FFlagData extends Component<FFlagDataProps, FFlagDataState> {
  constructor (props: FFlagDataProps) {
    super(props)

    this.state = {
      series: allSeries[0]
    }
  }

  async componentDidMount () {
    return this.getData()
  }

  async getData () {
    this.setState({
      flags: undefined
    }, async () => {
      this.setState({
        flags: await getFlags(this.state.series)
      })
    })
  }

  render () {
    return (
      <React.Fragment>
        {
          this.state.flags
            ? this.props.children({
              flags: this.state.flags,
              series: this.state.series,
              refresh: () => this.getData(),
              setSeries: (series) => this.setState({ series }, this.getData)
            })
            : (
              <LinearProgress style={{
                marginTop: 2
              }} />
            )
        }
      </React.Fragment>
    )
  }
}
