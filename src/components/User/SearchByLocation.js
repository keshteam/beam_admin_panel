import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import UserContext from "../../store/user-context";

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

  const handleLocation = (event) => {
    setLocation(event.target.value);
    event.target.value.trim().length === 0
      ? setChecklocation(true)
      : setChecklocation(false);
  };
  const searchUsersHandler = async () => {
    if(location.trim().length === 0){
      setChecklocation(true);
      return;
    }else{
      setChecklocation(false);
      userCtx.onSearchByLocation(location);
    }
  };

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
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          onClick={searchUsersHandler}
        >
          Search
        </Button>
    </div>
  );
};

export default GetUsersByLocation;
