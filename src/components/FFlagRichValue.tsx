import React from "react"
import FFlagRichValueFlag from "./rich-values/FFlagRichValueFlag"
import FFlagRichValuePlace from "./rich-values/FFlagRichValuePlace"
import FFlagRichValueUser from "./rich-values/FFlagRichValueUser"

interface FFlagRichValueProps {
  flag: string
  value: string
}

const prefixRichValueMap = {
  FFlag: FFlagRichValueFlag,
  DFFlag: FFlagRichValueFlag,
  SFFlag: FFlagRichValueFlag,
}

const filterTypeMap: {
  [index: string]: (pieces: string[]) => JSX.Element
} = {
  Place: (places) => (
    <div
      style={{
        display: "inline-block",
        verticalAlign: "-4px",
      }}
    >
      {places.map((placeId) => (
        <FFlagRichValuePlace key={placeId} placeId={Number(placeId)} />
      ))}
    </div>
  ),
}

const specialPreviews: {
  pattern: RegExp
  render: (value: string, matches: RegExpMatchArray) => JSX.Element | undefined
  changeValue?: (value: string, match: RegExpMatchArray) => string
}[] = [
  {
    pattern: /.+_(.+)Filter$/,
    render: (value, matches) => {
      const filterType = matches[1]
      const [, ...filterValues] = value.split(";")

      if (filterTypeMap[filterType]) {
        return filterTypeMap[filterType](filterValues)
      }
    },
    changeValue: (value) => value.split(";")[0],
  },
  {
    pattern: /^D?FString.*UserIds$/,
    render: (value) => {
      console.log(value, value.includes(","))
      const userIds = value.split(/(?:,|;)/)

      return (
        <>
          {userIds.map((userId) => (
            <FFlagRichValueUser key={userId} userId={Number(userId)} />
          ))}
        </>
      )
    },
  },
]

export default function FFlagRichValue(props: FFlagRichValueProps) {
  let additionalPreview = <></>

  let value = props.value

  for (const preview of specialPreviews) {
    let matches = props.flag.match(preview.pattern)
    if (matches) {
      additionalPreview =
        preview.render(props.value, matches) || additionalPreview

      if (preview.changeValue) {
        value = preview.changeValue(value, matches)
      }
    }
  }

  for (const [key, RichDisplay] of Object.entries(prefixRichValueMap)) {
    if (props.flag.startsWith(key)) {
      return (
        <>
          <RichDisplay value={value} /> &nbsp;&nbsp; {additionalPreview}
        </>
      )
    }
  }

  // return <FFlagRichValueRaw value={props.value} />
  return additionalPreview
}
