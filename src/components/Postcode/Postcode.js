import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import BulkPostcodeUpload from "./BulkPostcodeUpload";
import AddPostcode from "./AddPostcode";
import GetPostcodesByLocation from "./SearchByLocation";
import SearchByPostcode from "./SearchByPostcode";
import PostcodeList from "./PostcodeList";
import PostcodeProvider from "../../store/PostcodeProvider";

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  grid: {
    flexGrow: 1,
  },
}));

export default function Postcode() {
  const classes = useStyles();
  return (
    <PostcodeProvider>
      <div className={classes.grid}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <BulkPostcodeUpload />
          </Grid>
          <Grid item xs={6}>
            <AddPostcode />
          </Grid>
          <Grid item xs={6}>
            <GetPostcodesByLocation/>
          </Grid>
          <Grid item xs={6}>
            <SearchByPostcode />
          </Grid>
        </Grid>
      </div>
      <PostcodeList />
      <br />
    </PostcodeProvider>
  );
}
