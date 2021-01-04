import Link from '@material-ui/core/Link'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

export default function FFlagSeriesLink (series: string) {
  return (
    <Link
      component={
        (p: any) => <RouterLink to={`/history/${series}`} {...p} />
      }
      color='inherit'
      underline='none'
      style={{
        fontSize: 14,
        borderBottom: '1px dotted silver',
        wordWrap: 'break-word'
      }}
    >
      {series}
    </Link>
  )
}
