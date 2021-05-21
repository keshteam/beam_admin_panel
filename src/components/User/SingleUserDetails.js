import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

const SingleUserDetails = (props) => {
    const classes = useStyles();
  return (
    <React.Fragment>
      <FormControl>
        <InputLabel htmlFor="firstName">Name</InputLabel>
        <Input
          id="firstName"
          value={props.userData.firstName ? props.userData.firstName : "NA"}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          value={props.userData.email ? props.userData.email : "NA"}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="isRegistration">Registered?</InputLabel>
        <Input id="isRegistration" value={props.userData.isRegistration} />
      </FormControl>
      {props.userData.isRegistration === "Yes" && (
        <div className={classes.root}>
          <FormControl>
            <InputLabel htmlFor="ethnicityMaster">Ethnicity Master</InputLabel>
            <Input
              id="ethnicityMaster"
              value={props.userData.profile.ethnicityMaster}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="ethnicityChild">Ethnicity Child</InputLabel>
            <Input
              id="ethnicityChild"
              value={props.userData.profile.ethnicityChild}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="gender">gender</InputLabel>
            <Input id="gender" value={props.userData.profile.gender} />
          </FormControl>
        </div>
      )}
    </React.Fragment>
  );
};

export default SingleUserDetails;
