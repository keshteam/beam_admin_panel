import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  grid: {
    flexGrow: 1,
  },
  root: {
    minWidth: 275,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([])
  const [activeUsers, setActiveUsers] = useState([])

  useEffect(()=>{
    const getUserList = async () => {
      try {
        let {data} = await axios.get(
          process.env.REACT_APP_API_URL + "user/getAll"
        );
        const activeUsers = [...data].filter(data => {
          let oneDay = 24*60*60*1000;
          return data.daysDiff = Math.abs((new Date() - new Date(data.lastLogin))/oneDay) < 1;
        });
        setActiveUsers(activeUsers);
        setUsers(data);
      } catch (e) {
        console.log("error in getUserList", e);
      }
    };
    getUserList();
  }, [])

  

  return (
    <div className={classes.grid}>
      <Grid container spacing={3}>
        <Grid  item xs={6}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Total Users
              </Typography>
              <Typography color="textSecondary">{users.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Active Users
              </Typography>
              <Typography color="textSecondary">{activeUsers.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          {/* <h1>hello world</h1> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
