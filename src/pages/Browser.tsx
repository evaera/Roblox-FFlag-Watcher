import Grid from '@material-ui/core/Grid'
import FFlagTable from '../components/FFlagTable'
import FFlagData from '../components/FFlagData'
import React from 'react'

export default function Browser () {
  return (
    <FFlagData>
      {(options) => (
        <FFlagTable {...options} />
      )}
    </FFlagData>
  )
}
