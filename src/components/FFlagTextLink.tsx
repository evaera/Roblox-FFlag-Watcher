import React, { Component, Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
import { getFlagType } from '../Util'

export default function FFlagTextLink (flag: string, series: string) {
  return (
    <Link
      component={
        (p: any) => <RouterLink to={`/history/${series}/${flag}`} {...p} />
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
