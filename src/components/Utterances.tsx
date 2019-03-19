import React from 'react'

interface UtterancesProps {
  term: string
}

export default class Utterances extends React.Component<UtterancesProps> {
  private ref: any

  constructor (props: UtterancesProps) {
    super(props)

    this.ref = React.createRef()
  }

  componentDidMount () {
    const { term } = this.props

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.setAttribute('repo', 'evaera/Roblox-FFlag-Watcher')
    script.setAttribute('crossorigin', 'anonymous')
    script.setAttribute('label', 'comment')
    script.setAttribute('theme', 'github-dark')
    script.setAttribute('issue-term', term)

    this.ref.current.appendChild(script)
  }

  render () {
    return <div ref={this.ref}></div>
  }
}
