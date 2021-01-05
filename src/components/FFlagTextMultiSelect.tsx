import { Link } from "@material-ui/core"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { getFlagType } from "../Util"

interface FFlagTextMutliSelectProps {
  series: string[]
  flag: string
}

export default function FFlagTextMultiSelect(props: FFlagTextMutliSelectProps) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Link
        color="inherit"
        underline="none"
        style={{
          fontSize: 14,
          borderBottom: "1px dotted silver",
          wordWrap: "break-word",
          cursor: "pointer",
        }}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {getFlagType(props.flag).name}
      </Link>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {props.series.sort().map((series) => (
          <MenuItem
            onClick={handleClose}
            key={series}
            component={React.forwardRef((p: any, ref) => (
              <RouterLink
                style={{
                  color: "inherit",
                  textDecoration: "none",
                }}
                to={`/history/${series}/${props.flag}`}
                {...p}
              />
            ))}
          >
            {series}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
