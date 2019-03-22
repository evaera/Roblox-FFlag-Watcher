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

    const hash = window.location.hash.substr(1)

    this.state = {
      series: allSeries.includes(hash) ? hash : allSeries[0]
    }
  }

  async componentDidMount () {
    return this.getData()
  }

  async getData (fresh?: boolean) {
    if (this.state.series !== allSeries[0]) {
      window.location.hash = `#${this.state.series}`
    }

    this.setState({
      flags: undefined
    }, async () => {
      this.setState({
        flags: await getFlags(this.state.series, fresh)
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
              refresh: () => this.getData(true),
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
