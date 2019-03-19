import React from 'react'
import EventTable from '../components/EventTable'
import { match } from 'react-router-dom'

interface HistoryParams {
  series?: string
  flag?: string
}

export default function History ({ match }: { match: match<HistoryParams> }) {
  return (
    <EventTable
      series={match.params.series}
      flag={match.params.flag}
      key={`${match.params.series}:${match.params.flag}`}
    />
  )
}
