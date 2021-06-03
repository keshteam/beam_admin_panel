import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";

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
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const getAllLocations = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}postcode/getAllLocations`
        );
        setLocations(data);
      } catch (e) {
        console.log("error in getAllLocations", e);
      }
    };
    // call feedback data on page loading
    getAllLocations();
  }, []);

  const handleLocation = (event) => {
    setIsDelete(false)
    setLocation(event.target.value);
    event.target.value.trim().length === 0
      ? setChecklocation(true)
      : setChecklocation(false);
  };
  const searchPostcodeHandler = async () => {
    try {
      location.trim().length === 0
        ? setChecklocation(true)
        : setChecklocation(false);
      if (location.trim().length > 0) {
        let { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}postcode/getAllByLocation/${location}`
        );
        props.filteredData(data);
        setIsDelete(true);
      }
    } catch (error) {
      console.log("error in get postcodes by location", error);
    }
  };

  const deletePostcodesHandler = async()=> {
    if (window.confirm("Are you sure want to delete?")) {
      try{
        let { data } = await axios.delete(
          `${process.env.REACT_APP_API_URL}postcode/deleteMany/${location}`
        );
        if(data.deletedCount > 0){
          alert('Deleted Successfully');
          setLocations((prevLocation)=>{
            let prevList = [...prevLocation];
            let newList = prevList.filter(e=>{
              return e !== location;
            })
            return newList;
          })
          setIsDelete(false);
          props.onBulkDelete()
        }
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
          {locations.map((location, index) => {
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
