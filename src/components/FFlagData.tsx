import React, { Component } from 'react'
import { getFlags, Flag } from '../api'
import { LinearProgress } from '@material-ui/core'

interface FFlagDataProps {
  children: ({ flags, refresh }: {flags: Flag[], refresh: () => any}) => JSX.Element
}

interface FFlagDataState {
  flags?: Flag[]
}

export default class FFlagData extends Component<FFlagDataProps, FFlagDataState> {
  constructor (props: FFlagDataProps) {
    super(props)

    this.state = {}
  }

  async componentDidMount () {
    return this.getData()
  }

  async getData () {
    this.setState({
      flags: undefined
    })

    this.setState({
      flags: await getFlags()
    })
  }

  render () {
    return (
      <React.Fragment>
        {
          this.state.flags
            ? this.props.children({
              flags: this.state.flags,
              refresh: () => this.getData()
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
