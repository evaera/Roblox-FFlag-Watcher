import Link from "@material-ui/core/Link"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { getFlagType } from "../Util"

export default function FFlagTextLink(flag: string, series: string) {
  return (
    <Link
      component={React.forwardRef((p: any, ref) => (
        <RouterLink to={`/history/${series}/${flag}`} {...p} ref={ref} />
      ))}
      color="inherit"
      underline="none"
      style={{
        fontSize: 14,
        borderBottom: "1px dotted silver",
        wordWrap: "break-word",
      }}
    >
      {getFlagType(flag).name}
    </Link>
  )
}
