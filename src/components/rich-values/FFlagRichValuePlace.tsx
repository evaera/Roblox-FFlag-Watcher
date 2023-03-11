import Tooltip from "@material-ui/core/Tooltip"
import React, { useEffect, useState } from "react"
import { fetchCors, getRobloxGameInfo } from "../../api"

export default function FFlagRichValuePlace(props: { placeId: number }) {
  const [placeData, setPlaceData] = useState({
    Name: "Loading...",
    Creator: {
      Name: "Loading...",
    },
  })

  const [thumbnail, setThumbnail] = useState("")

  useEffect(() => {
    getRobloxGameInfo(props.placeId).then(setPlaceData).catch(console.warn)
    fetchCors(
      `https://thumbnails.roblox.com/v1/assets?assetIds=${props.placeId}&format=Png&size=420x420`
    )
      .then(resp => resp.json())
      .then(body => setThumbnail(body.data?.at(0).imageUrl))
      .catch(console.warn)
  }, [props.placeId])

  return (
    <Tooltip title={`${placeData.Name} by ${placeData.Creator.Name}`}>
      <a
        href={`https://roblox.com/games/${props.placeId}/Game`}
        target="_blank"
      >
        <img
          src={}
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
