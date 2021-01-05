import Typography from "@material-ui/core/Typography"
import React from "react"

export default function FFlagRichValueRaw(props: { value: string }) {
  return (
    <Typography
      noWrap={true}
      style={{
        fontFamily: "monospace",
        fontSize: 14,
        whiteSpace: "pre-wrap",
        wordBreak: "break-all",
      }}
    >
      {props.value}
    </Typography>
  )
}
