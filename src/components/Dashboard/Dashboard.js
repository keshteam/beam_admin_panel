import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios"
import GoogleMapContainer from "./GoogleMap"

const useStyles = () => ({
  container: {
    maxHeight: 440,
  },
  grid: {
    flexGrow: 1,
  },
  root: {
    minWidth: 275,
  },
});

class Dashboard extends Component{
  constructor(){
    super();
    this.state= {
      users: [],
      activeUsers: []
    }
  }

  // componentWillUnmount(){
  //   console.log('clean up')
  // }
  
  async componentDidMount(){
    try {
      let {data} = await axios.get(
        process.env.REACT_APP_API_URL + "user/getAll"
      );
      const activeUsers = [...data].filter(data => {
        let oneDay = 24*60*60*1000;
        return data.daysDiff = Math.abs((new Date() - new Date(data.lastLogin))/oneDay) < 1;
      });
      this.setState({
        users: data,
        activeUsers: activeUsers
      })

    } catch (e) {
      console.log("error in getAll users", e);
    }
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.grid}>
        <Grid container spacing={3}>
          <Grid  item xs={6}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Total Users
                </Typography>
                <Typography color="textSecondary">{this.state.users.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Active Users
                </Typography>
                <Typography color="textSecondary">{this.state.activeUsers.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            
            <GoogleMapContainer/>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles)(Dashboard);
