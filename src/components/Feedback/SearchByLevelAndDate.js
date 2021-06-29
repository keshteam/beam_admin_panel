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

const useStyles = (theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: 120,
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
      startDate: new Date("2014-08-18T21:11:54"),
      endDate: new Date("2014-08-18T21:11:54"),
    };
  }
  componentDidMount() {}

  handleLevel = (event) => {
    this.setState({
      level: event.target.value,
    });
    // feedbackCtx.onCheckExportStatus(false);
    event.target.value.trim().length === 0
      ? this.setState({ checkLevel: true })
      : this.setState({ checkLevel: false });
  };

  searchHandler = () => {
    if (this.state.level.length === 0) {
      this.setState({ checkLevel: true });
      return;
    } else {
      alert(this.state.level);
    }
  };

  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = (date) => {
    this.setState({ startDate: date });
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
                format="MM/dd/yyyy"
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
                format="MM/dd/yyyy"
                value={this.state.endDate}
                onChange={this.handleEndDateChange.bind(this)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
            <Grid item xs={3}>
              {!this.context.exportStatus ? (
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
                  // onClick={ExportToExcel}
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
