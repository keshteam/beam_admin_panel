import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import PostcodeContext from "../../store/postcode-context";

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
    const postcodeCtx = useContext(PostcodeContext);

    const searchPostcodeHandler = async()=>{
        let postcodeName = postcodeRef.current.value;
        if(postcodeName.trim().length === 0){
            setCheckPostcodeName(true);
            return;
        }else{
            setCheckPostcodeName(false);
            postcodeCtx.onSearchByPostcode(postcodeName)
            postcodeRef.current.value = '';
            
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