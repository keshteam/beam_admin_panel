import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FeedbackContext from "../../store/feedback-context";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import exportFromJSON from "export-from-json";

let exportData = [];
const fileName = "download";
const exportType = "xls";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: 100,
      paddingTop: 10
    },
  },
  button: {
    paddingTop: 8,
    marginTop: 20,
    width: 80,
  },
  error: {
    color: "red",
  },
});
class SearchByLevelAndDate extends Component {
  static contextType = FeedbackContext;

  constructor() {
    super();
    this.state = {
      level: "",
      checkLevel: false,
      levels: [
        {
          name: "Level 1",
          value: "level_1",
        },
        {
          name: "Level 2",
          value: "level_2",
        },
        {
          name: "Level 3",
          value: "level_3",
        },
        {
          name: "Level 4",
          value: "level_4",
        },
        {
          name: "Level 5",
          value: "level_5",
        },
        {
          name: "Level 6",
          value: "level_6",
        },
        {
          name: "Level 7",
          value: "level_7",
        },
        {
          name: "Level 8",
          value: "level_8",
        },
        {
          name: "Level 9",
          value: "level_9",
        },
        {
          name: "Level 10",
          value: "level_10",
        },
      ],
      startDate: new Date("2021-01-01T21:11:54"),
      endDate: new Date("2021-01-02T21:11:54"),
    };
  }

  ExportToExcel = () => {
    exportFromJSON({ data: exportData, fileName, exportType });
    this.context.onLevelExportStatus(false);
  };

  // componentDidMount() {}

  componentDidUpdate() {
    if(this.context.exportStatusForLevel){
      exportData = [];
      let getUsers = [...this.context.users];
      for (let x of getUsers){
        let obj = {};
        obj.Message = x.feedbackData[0].feedbackMsg;
        obj.Reaction = (x.feedbackData[0].isSmiled === '')? x.feedbackData[0].isSmiled : (x.feedbackData[0].isSmiled === 'happy')? '😃':'😔';
        obj.Level = x.feedbackData[0].level.split('_')[1];
        obj.Updated = x.feedbackData[0].updatedOn;
        exportData.push(obj);
      }
    }
  }

  handleLevel = (event) => {
    this.setState({
      level: event.target.value,
    });
    this.context.onLevelExportStatus(false);
    event.target.value.trim().length === 0
      ? this.setState({ checkLevel: true })
      : this.setState({ checkLevel: false });
  };

  searchHandler = () => {
    if (this.state.level.length === 0) {
      this.setState({ checkLevel: true });
      return;
    } else {
      let payload = {
        level: this.state.level,
        start_date: moment(this.state.startDate).format('YYYY-MM-DD'),
        end_date: moment(this.state.endDate).format('YYYY-MM-DD'),
      }
      // console.log(payload)
      this.context.onSearchByLevel(payload);
    }
  };

  handleStartDateChange = (date) => {
    this.context.onLevelExportStatus(false);
    this.setState({ startDate: date });
  };

  handleEndDateChange = (date) => {
    this.context.onLevelExportStatus(false);
    this.setState({ endDate: date });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <Grid item xs={2}>
              <div className={classes.root}>
              <FormControl>
                <InputLabel id="demo-simple-select-label" htmlFor="Level">
                  Level
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  // defaultValue=""
                  id="demo-simple-select"
                  value={this.state.level}
                  onChange={this.handleLevel.bind(this)}
                >
                  {this.state.levels.map((data, index) => {
                    return (
                      <MenuItem value={data.value} key={index}>
                        {data.name}
                      </MenuItem>
                    );
                  })}
                </Select>
                {this.state.checkLevel && (
                  <p className={classes.error}>Required Level</p>
                )}
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={3}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog-start-date"
                label="Start Date"
                format="dd/MM/yyyy"
                value={this.state.startDate}
                onChange={this.handleStartDateChange.bind(this)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>

            <Grid item xs={3}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog-end-date"
                label="End Date"
                format="dd/MM/yyyy"
                value={this.state.endDate}
                onChange={this.handleEndDateChange.bind(this)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={3}>
              {!this.context.exportStatusForLevel ? (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.button}
                  onClick={this.searchHandler}
                >
                  Search
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  className={classes.button}
                  onClick={this.ExportToExcel}
                >
                  Download
                </Button>
              )}
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default withStyles(useStyles)(SearchByLevelAndDate);
