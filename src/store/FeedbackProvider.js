import React, { useEffect, useState } from "react";
import FeedbackContext from "./feedback-context";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import ViewModal from "../UI/ViewModal/ViewModal";

const FeedbackProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [userFeedback, setUserFeedback] = useState();
  const [openViewModal, setViewOpenModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [exportStatus, setExportStatus] = useState(false);

  const closeViewModalHandler = () => {
    setUserFeedback(null);
    setViewOpenModal(false);
  };

  const viewFeedbackHandler = async(feedbackData) =>{
    console.log(feedbackData)
    setUserFeedback(feedbackData)
    setViewOpenModal(true)
  };
  const checkExportHandler = (status)=>{
    setExportStatus(status)
  }

  useEffect(() => {
    const getFeedbackList = async () => {
      try {
        let { data } = await axios.get(
          process.env.REACT_APP_API_URL + "feedback/getAll"
        );
        let usersList = data.map((element) => {
          let user = {};
          user.firstName = element.user ? element.user.firstName : "";
          user.email = element.user ? element.user.email : "";
          user.isRegistration = element.user ? "Yes" : "No";
          user.feedbackData = element.feedbackData;
            user.action = (
              <React.Fragment>
                <VisibilityIcon color="primary" onClick={()=>{ viewFeedbackHandler(element.feedbackData) }} />
              </React.Fragment>
            );
          return user;
        });
        setUsers(usersList);
      } catch (e) {
        console.log("error in getUserList", e);
      }
    };

    const getAllLocations = async () => {
      try {
        let { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}postcode/getAllLocations`
        );
        setLocations(data);
      } catch (e) {
        console.log("error in getAllLocations", e);
      }
    };
    // call feedback data on page loading
    getFeedbackList();
    getAllLocations();
  }, []);

  const getByLocationHandler = async(location)=> {
    let {data} = await axios.get(
      `${process.env.REACT_APP_API_URL}feedback/getByLocation/${location}`
    );

    let usersList = data.map((element) => {
      let user = {};
      user.firstName = element.user ? element.user.firstName : "";
      user.email = element.user ? element.user.email : "";
      user.isRegistration = element.user ? "Yes" : "No";
      user.feedbackData = element.feedbackData;
        user.action = (
          <React.Fragment>
            <VisibilityIcon color="primary" onClick={()=>{ viewFeedbackHandler(element.feedbackData) }} />
          </React.Fragment>
        );
      return user;
    });
    
    setUsers(usersList);
    usersList.length > 0 ? checkExportHandler(true): checkExportHandler(false);
  }

  return (
    <>
      {userFeedback && (
        <ViewModal
          handleClose={closeViewModalHandler}
          open={openViewModal}
          title={"View Feedback"}
          userFeedback={userFeedback}
        />
      )}
      <FeedbackContext.Provider
        value={{
          users,
          locations,
          exportStatus,
          onCheckExportStatus: checkExportHandler,
          onSearchByLocation: getByLocationHandler,
        }}
      >
        {props.children}
      </FeedbackContext.Provider>
    </>
  );
};

export default FeedbackProvider;
