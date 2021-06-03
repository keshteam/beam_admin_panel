import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
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

const SearchByPostcode = (props)=>{
    const classes = useStyles();
    const postcodeRef = useRef();
    const [checkPostcodeName, setCheckPostcodeName] = useState(false);

    const searchPostcodeHandler = async()=>{
        let postcodeName = postcodeRef.current.value;
        if(postcodeName.trim().length === 0){
            setCheckPostcodeName(true);
            return;
        }else{
            setCheckPostcodeName(false);
            try {
                let { data } = await axios.get(
                    `${process.env.REACT_APP_API_URL}postcode/get/${postcodeName}`
                );
                props.onSearch(data)
                postcodeRef.current.value = '';
            } catch (error) {
                console.log("error in find postcode", error);
            }
        }   
    }

    const onCheckPostcode = ()=>{
        let postcodeName = postcodeRef.current.value;
        (postcodeName.trim().length === 0)? setCheckPostcodeName(true) : setCheckPostcodeName(false);
    }

    return(
        <div className={classes.root}>
            <FormControl>
                <InputLabel htmlFor="postcode">Postcode</InputLabel>
                <Input type="text" placeholder="Postcode" inputRef={postcodeRef} onChange={onCheckPostcode} />
                {checkPostcodeName && <p className={classes.error}>Required Postcode</p>}
            </FormControl>
            <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
            onClick={searchPostcodeHandler}
            >
            Search
            </Button>
        </div>
    )
}

export default SearchByPostcode;