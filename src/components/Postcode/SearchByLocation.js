import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import PostcodeContext from "../../store/postcode-context";

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

const GetPostcodesByLocation = (props) => {
  const classes = useStyles();
  const [location, setLocation] = useState("");
  const [checklocation, setChecklocation] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const postcodeCtx = useContext(PostcodeContext);

  const handleLocation = (event) => {
    setIsDelete(false)
    setLocation(event.target.value);
    event.target.value.trim().length === 0
      ? setChecklocation(true)
      : setChecklocation(false);
  };
  const searchPostcodeHandler = async () => {
    location.trim().length === 0
      ? setChecklocation(true)
      : setChecklocation(false);
    if (location.trim().length > 0) {
      postcodeCtx.onSearchByLocation(location);
      setIsDelete(true);
    }
  };

  const deletePostcodesHandler = async()=> {
    if (window.confirm("Are you sure want to delete?")) {
      try{
        postcodeCtx.onBulkDeleteByLocation(location);
        setLocation("")
        setIsDelete(false);
      }catch(error){
        console.log("error in deletePostcodesHandler", error);
      }
    }
  }

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
          {postcodeCtx.locations.map((location, index) => {
            return (
              <MenuItem value={location} key={index}>
                {location}
              </MenuItem>
            );
          })}
        </Select>
        {checklocation && <p className={classes.error}>Required Location</p>}
      </FormControl>
      {isDelete ? (
        <Button
          variant="outlined"
          size="small"
          color="secondary"
          className={classes.button}
          onClick={deletePostcodesHandler}
        >
          Delete
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="small"
          color="primary"
          className={classes.button}
          onClick={searchPostcodeHandler}
        >
          Search
        </Button>
      )}
    </div>
  );
};

export default GetPostcodesByLocation;
