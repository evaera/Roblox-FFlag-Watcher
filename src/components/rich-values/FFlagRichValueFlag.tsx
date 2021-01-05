import green from "@material-ui/core/colors/green"
import red from "@material-ui/core/colors/red"
import Tooltip from "@material-ui/core/Tooltip"
import DoneOutlineIcon from "@material-ui/icons/Done"
import HelpOutlineIcon from "@material-ui/icons/HelpOutline"
import NotInterestedIcon from "@material-ui/icons/NotInterested"
import React from "react"

const renderMap: { [index: string]: () => JSX.Element } = {
  True: () => (
    <Tooltip title="True">
      <DoneOutlineIcon
        style={{
          color: green[500],
        }}
      />
    </Tooltip>
  ),
  False: () => (
    <Tooltip title="False">
      <NotInterestedIcon
        style={{
          color: red[500],
        }}
      />
    </Tooltip>
  ),
}

export default function FFlagRichValueFlag(props: { value: string }) {
  if (renderMap[props.value]) {
    return renderMap[props.value]()
  }

  return <HelpOutlineIcon />
}
