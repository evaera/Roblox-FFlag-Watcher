import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import React from "react"
import { Link as RouterLink } from "react-router-dom"
import { allSeries } from "../api"

export default function FFlagSelectHistorySeries(props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div {...props}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        View Specific Bucket
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {allSeries.map((series) => (
          <MenuItem
            onClick={handleClose}
            key={series}
            component={React.forwardRef((p: any, ref) => (
              <RouterLink to={`/history/${series}`} {...p} />
            ))}
          >
            {series}
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
