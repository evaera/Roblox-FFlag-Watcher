import Tooltip from "@material-ui/core/Tooltip"
import React, { useEffect, useState } from "react"
import { getRobloxGameInfo } from "../../api"

export default function FFlagRichValuePlace(props: { placeId: number }) {
  const [placeData, setPlaceData] = useState({
    Name: "Loading...",
    Creator: {
      Name: "Loading...",
    },
  })

  useEffect(() => {
    getRobloxGameInfo(props.placeId).then(setPlaceData).catch(console.warn)
  }, [props.placeId])

  return (
    <Tooltip title={`${placeData.Name} by ${placeData.Creator.Name}`}>
      <a
        href={`https://roblox.com/games/${props.placeId}/Game`}
        target="_blank"
      >
        <img
          src={`https://assetgame.roblox.com/Game/Tools/ThumbnailAsset.ashx?aid=${props.placeId}&fmt=png&wd=420&ht=420`}
          height={32}
          style={{
            borderRadius: "6px",
            margin: "3px",
            background: "#333",
          }}
        />
      </a>
    </Tooltip>
  )
}
