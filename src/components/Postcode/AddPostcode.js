import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    },
    button: {
        paddingTop: 10,
        marginTop: 20
    },
    error: {
        color: 'red'
    }
  }));
const AddPostcode = (props)=> {
    const classes = useStyles();
    const [postcodeName, setPostcodeName] = useState('');
    const [checkPostcodeName, setCheckPostcodeName] = useState(false);
    const [location, setLocation] = useState('');
    const [checklocation, setChecklocation] = useState(false);
    const [locations, setLocations] = useState([]);

    const handleLocation = (event) => {
        setLocation(event.target.value);
        (event.target.value.trim().length===0) ? setChecklocation(true) : setChecklocation(false);
    };
    const postcodeNameHandler = (event) =>{
        setPostcodeName(event.target.value);
        (event.target.value.trim().length===0) ? setCheckPostcodeName(true) : setCheckPostcodeName(false);
    }

    const addPostcodeHandler = async()=>{
        try{
            (postcodeName.trim().length===0) ? setCheckPostcodeName(true) : setCheckPostcodeName(false);;
            (location.trim().length===0) ? setChecklocation(true) : setChecklocation(false);
            
            if(postcodeName.trim().length > 0 && location.trim().length >0){
                const payload = {
                    postcode: postcodeName,
                    location: location
                };
                let {data} = await axios.post(process.env.REACT_APP_API_URL+'postcode/add', payload);
                props.onAddUser(data);
                alert('Postcode Added');
                setPostcodeName('')
                setLocation('')
            }
        } catch(e){
            console.log("error in add postcode", e);
        }  
    }

    useEffect(() => {
        const getAllLocations = async () => {
          try {
            let {data} = await axios.get(
              process.env.REACT_APP_API_URL + "postcode/getAllLocations"
            );       
            setLocations(data);
          } catch (e) {
            console.log("error in getAllLocations", e);
          }
        };
        // call feedback data on page loading
        getAllLocations();
        // return ()=>{
        //     console.log('clean up')
        // }
    }, []);

    return (
        <div className={classes.root}>
            <FormControl>
                <InputLabel htmlFor="postcode">Postcode</InputLabel>
                <Input type="text" value={postcodeName} placeholder="Postcode" onChange= {postcodeNameHandler} />
                {checkPostcodeName && <p className={classes.error}>Required Postcode</p>}
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label" htmlFor="location">Location</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={location}
                onChange={handleLocation}
                >
                {
                    locations.map((location, index)=>{
                        return (
                            <MenuItem value={location} key={index} >{location}</MenuItem>
                        )
                    })
                }
            </Select>
            {checklocation && <p className={classes.error}>Required Location</p>}
            </FormControl>
            <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
            onClick={addPostcodeHandler}
            >
            Add Postcode
            </Button>
        </div>
    )
}
export default AddPostcode;