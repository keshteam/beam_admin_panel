import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import UserContext from "../../store/user-context"

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

const SearchByUserId = (props)=>{
    const classes = useStyles();
    const [userId, setUserId] = useState('');
    const [userIdErrorStatus, setUserIdErrorStatus] = useState(false);
    const userCtx = useContext(UserContext);

    const onGetUserHandler = async()=>{
        if(userId.trim().length === 0){
            setUserIdErrorStatus(true);
            return;
        }else{
            setUserIdErrorStatus(false); 
            // console.log('userId', userId.length)  
            userCtx.onSearchByUserId(userId)   
        }   
    }


    const checkUserIdHandler = (event)=>{
        let getUserId = event.target.value;
        (getUserId.trim().length === 0)? setUserIdErrorStatus(true) : setUserIdErrorStatus(false);
        setUserId(getUserId)
    }

    return(
        <div className={classes.root}>
            <FormControl>
                <InputLabel htmlFor="userId">User Id</InputLabel>
                <Input type="text" placeholder="User Id" value={userId} onChange={checkUserIdHandler}/>
                {userIdErrorStatus && <p className={classes.error}>Required User Id</p>}
            </FormControl>
            <Button
            variant="outlined"
            size="small"
            color="primary"
            className={classes.button}
            onClick={onGetUserHandler}
            >
            Search
            </Button>
        </div>
    )
}

export default SearchByUserId;