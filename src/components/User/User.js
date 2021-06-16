import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import UserList from "./UserList";
import UserProvider from "../../store/UserProvider";
import Grid from "@material-ui/core/Grid";
import SearchByPostcode from "./SearchByPostcode";

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  grid: {
    flexGrow: 1,
  },
}));

export default function User() {
  const classes = useStyles();
  return (
    <UserProvider>
      <div className={classes.grid}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <SearchByPostcode />
          </Grid>
          
        </Grid>
      </div><br/>
      <UserList/>
    </UserProvider>
  );
}
