import Tooltip from "@material-ui/core/Tooltip"
import React, { useEffect, useState } from "react"
import { getRobloxUserInfo } from "../../api"

export default function FFlagRichValueUser({ userId }: { userId: number }) {
  const [userData, setUserData] = useState({
    Username: "Loading...",
  })

  useEffect(() => {
    getRobloxUserInfo(userId).then(setUserData).catch(console.warn)
  }, [userId])

  return (
    <Tooltip title={userData.Username}>
      <a
        href={`https://www.roblox.com/users/${userId}/profile`}
        target="_blank"
      >
        <img
          src={`https://roblox-avatar.eryn.io/${userId}`}
          height={32}
          style={{
            borderRadius: "100%",
            margin: "3px",
          }}
        />
      </a>
    </Tooltip>
  )
}
