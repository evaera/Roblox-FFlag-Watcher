import Tooltip from "@material-ui/core/Tooltip"
import React, { useEffect, useState } from "react"
import { fetchCors, getRobloxGameInfo, getThumbnail } from "../../api"

export default function FFlagRichValuePlace(props: { placeId: number }) {
  const [placeData, setPlaceData] = useState({
    Name: "Loading...",
    Creator: {
      Name: "Loading...",
    },
  })

  const [thumbnailData, setThumbnailData] = useState("")

  useEffect(() => {
    getRobloxGameInfo(props.placeId).then(setPlaceData).catch(console.warn)
    getThumbnail(props.placeId).then(setThumbnailData).catch(console.warn)
  }, [props.placeId])

  return (
    <Tooltip title={`${placeData.Name} by ${placeData.Creator.Name}`}>
      <a
        href={`https://roblox.com/games/${props.placeId}/Game`}
        target="_blank"
      >
        <img
          src={thumbnail.data?.at(0).imageUrl}
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
