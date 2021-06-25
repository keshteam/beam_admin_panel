import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FeedbackList from "./FeedbackList";
import SearchByLocation from "./SearchByLocation";
import FeedbackProvider from "../../store/FeedbackProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  grid: {
    flexGrow: 1,
  },
}));

export default function Feedback() {
  const classes = useStyles();
  
  return (
    <FeedbackProvider>
      <div className={classes.grid}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <SearchByLocation/>
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
        </Grid>
      </div><br/>
      <FeedbackList/>
    </FeedbackProvider>
  );
}
