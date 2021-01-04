import { LinearProgress } from "@material-ui/core"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import BackIcon from "@material-ui/icons/ArrowBack"
import MUIDataTable from "mui-datatables"
import React from "react"
import Moment from "react-moment"
import { Link } from "react-router-dom"
import { getHistory, HistoryEvent } from "../api"
import { getFlagType } from "../Util"
import styles from "./EventTable.module.scss"
import FFlagSelectHistorySeries from "./FFlagSelectHistorySeries"
import FFlagSeriesLink from "./FFlagSeriesLink"
import FFlagTextLink from "./FFlagTextLink"
import FFlagTextMultiSelect from "./FFlagTextMultiSelect"
import FFlagTypeChip from "./FFlagTypeChip"
import LifecycleChip from "./LifecycleChip"
import Utterances from "./Utterances"

interface EventTableProps {
  series?: string
  flag?: string
}

interface EventTableState {
  events?: HistoryEvent[]
}

const columns = (single: boolean) => [
  {
    name: "Event",
    options: {
      customBodyRender: LifecycleChip,
    },
  },
  {
    name: "Bucket",
    options: {
      display: !single,
      customBodyRender: (series: string) =>
        series
          .split("\n")
          .map((name) => FFlagSeriesLink(name))
          .reduce((prev, element) => [prev, <br key={"?"} />, element] as any),
    },
  },
  {
    name: "Type",
    options: {
      customBodyRender: FFlagTypeChip,
      download: false,
      display: !single,
    },
  },
  {
    name: "Flag",
    options: {
      display: !single,
      customBodyRender: (flag: string, meta: any) => {
        const series = meta.rowData[1].split("\n")

        if (series.length === 1) {
          return FFlagTextLink(flag, series[0])
        } else {
          return <FFlagTextMultiSelect series={series} flag={flag} />
        }
      },
      download: false,
    },
  },
  {
    name: "Full Name",
    options: {
      display: false,
    },
  },
  {
    name: "Value",
    options: {
      customBodyRender: (value: string) => (
        <Typography
          noWrap={true}
          style={{
            fontFamily: "monospace",
            fontSize: 14,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {value}
        </Typography>
      ),
      filterOptions: ["True", "False"],
    },
  },
  {
    name: "Time",
    options: {
      customBodyRender: (value: string) => (
        <Tooltip title={new Date(value).toLocaleString()}>
          <Moment fromNow>{value}</Moment>
        </Tooltip>
      ),
    },
  },
]

export default class EventTable extends React.Component<
  EventTableProps,
  EventTableState
> {
  constructor(props: EventTableProps) {
    super(props)

    this.state = {}
  }

  async componentDidMount() {
    return this.getData()
  }

  async getData() {
    this.setState(
      {
        events: undefined,
      },
      async () => {
        this.setState({
          events: await getHistory(this.props.series, this.props.flag),
        })
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.props.series && (
          <div
            style={{
              padding: 20,
            }}
          >
            <Link to="/history">
              <IconButton>
                <BackIcon />
              </IconButton>
            </Link>
            <Typography
              variant="h5"
              style={{
                verticalAlign: "middle",
                marginLeft: 10,
                display: "inline-block",
              }}
            >
              {`${this.props.flag || this.props.series} `}
              {this.props.flag && (
                <small
                  style={{
                    color: "#999",
                  }}
                >
                  {this.props.series}
                </small>
              )}
            </Typography>
          </div>
        )}
        <div className={`${this.props.flag && styles.grid}`}>
          <div className={styles.left}>
            {this.state.events ? (
              <MUIDataTable
                title="Event History"
                columns={columns(!!this.props.flag) as any}
                data={this.state.events.map((event) => [
                  event.type,
                  event.series,
                  getFlagType(event.flag).type,
                  event.flag,
                  event.flag,
                  event.value || "",
                  event.time,
                ])}
                options={{
                  selectableRows: "none",
                  sort: false,
                  print: false,
                  rowsPerPage: 100,
                  customToolbar: () => <FFlagSelectHistorySeries />,
                }}
              />
            ) : (
              <LinearProgress
                style={{
                  marginTop: 2,
                }}
              />
            )}
          </div>
          {this.props.flag && (
            <div className={styles.right}>
              <Utterances term={`${this.props.series}: "${this.props.flag}"`} />
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}
