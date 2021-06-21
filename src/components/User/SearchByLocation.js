import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import UserContext from "../../store/user-context";
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
  const userCtx = useContext(UserContext);

  const ExportToExcel = () => {
    exportFromJSON({ data: exportData, fileName, exportType });
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
    userCtx.onCheckExportStatus(false);
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
      await userCtx.onSearchByLocation(location);
    }
  };
  

  useEffect(() => {
    if(userCtx.exportStatus){
      let getUsers = [...userCtx.users];
      exportData = getUsers.map((elem)=>{
        let userData = {};
        userData.Email = elem.email;
        userData.Zipcode = elem.profile.location.zipcode;
        userData.Gender = elem.profile.gender;
        userData.Ethnicity = elem.profile.ethnicityMaster+'/'+elem.profile.ethnicityMaster;
        return userData;
      })
    }
  }, [userCtx.exportStatus]);

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
          {userCtx.locations.map((location, index) => {
            return (
              <MenuItem value={location} key={index}>
                {location}
              </MenuItem>
            );
          })}
        </Select>
        {checklocation && <p className={classes.error}>Required Location</p>}
      </FormControl>
      {!userCtx.exportStatus ? (
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
