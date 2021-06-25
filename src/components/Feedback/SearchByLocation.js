import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FeedbackContext from "../../store/feedback-context";
import exportFromJSON from "export-from-json";

let exportData = [];
const fileName = "download";
const exportType = "xls";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      minWidth: 120,
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
}));

const GetUsersByLocation = (props) => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [checklocation, setChecklocation] = useState(false);
  const feedbackCtx = useContext(FeedbackContext);

  const ExportToExcel = () => {
    exportFromJSON({ data: exportData, fileName, exportType });
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
    feedbackCtx.onCheckExportStatus(false);
    event.target.value.trim().length === 0
      ? setChecklocation(true)
      : setChecklocation(false);
  };
  const searchUsersHandler = async () => {
    if (location.trim().length === 0) {
      setChecklocation(true);
      return;
    } else {
      setChecklocation(false);
      await feedbackCtx.onSearchByLocation(location);
    }
  };
  

  useEffect(() => {
    if(feedbackCtx.exportStatus){
      exportData = [];
      let getUsers = [...feedbackCtx.users];
      for (let x of getUsers){
        for(let y of x.feedbackData){
          let obj = {};
          obj.Message = y.feedbackMsg;
          obj.Reaction = (y.isSmiled === '')? y.isSmiled : (y.isSmiled === 'happy')? '😃':'😔';
          obj.Level = y.level.split('_')[1];
          obj.Updated = y.updatedOn;
          exportData.push(obj);
        }
      }
      // console.log(exportData)
    }
  }, [feedbackCtx]);

  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel id="demo-simple-select-label" htmlFor="location">
          Location
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          onChange={handleLocation}
        >
          {feedbackCtx.locations.map((location, index) => {
            return (
              <MenuItem value={location} key={index}>
                {location}
              </MenuItem>
            );
          })}
        </Select>
        {checklocation && <p className={classes.error}>Required Location</p>}
      </FormControl>
      {!feedbackCtx.exportStatus ? (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          onClick={searchUsersHandler}
        >
          Search
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          onClick={ExportToExcel}
        >
          Download
        </Button>
      )}
    </div>
  );
};

export default React.memo(GetUsersByLocation);
