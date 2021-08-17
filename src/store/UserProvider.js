import React, { useEffect, useState } from "react";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import UserContext from "./user-context";
import axios from "axios";
import ViewModal from "../UI/ViewModal/ViewModal";
import GetStarsFromLevel from "../components/User/GetStarsFromLevel";

const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState();
  const [isUserDetails, setIsUserDetails] = useState();
  const [openViewModal, setViewOpenModal] = useState(false);
  const [locations, setLocations] = useState([]);
  const [exportStatus, setExportStatus] = useState(false);
  const [starData, setStarData] = useState([]);
  const [openStarModal, setOpenStarModal] = useState(false);

  useEffect(() => {
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
    // call locations data on page loading
    getAllLocations();
  }, []);

  useEffect(() => {
    const getUserList = async () => {
      try {
        let usersList = await axios.get(
          process.env.REACT_APP_API_URL + "user/getAll"
        );
        usersList = usersList.data.map((element) => {
          let data = {};
          data.id = element.id;
          data.firstName = element.firstName;
          data.email = element.email;
          data.isRegistration = element.isRegistration ? "Yes" : "No";
          data.profile = element.profile;
          data.action = (
            <React.Fragment>
              <VisibilityIcon
                color="primary"
                onClick={() => {
                  viewUserHandler(element.id);
                }}
              />
              <StarOutlineIcon
                color="primary"
                onClick={getStarHandler.bind(null, element.id)}
              />
              <DeleteOutlined
                color="secondary"
                onClick={() => {
                  deleteUserHandler(element.id);
                }}
              />
            </React.Fragment>
          );
          return data;
        });

        setUsers(usersList);
      } catch (e) {
        console.log("error in getUserList", e);
      }
    };
    // call user data on page loading
    getUserList();
  }, [deleteUserId]);

  const deleteUserHandler = async (userId) => {
    if (window.confirm("Are you sure want to delete?")) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}user/delete/${userId}`
        );
        setDeleteUserId(userId);
      } catch (e) {
        console.log("error in delete user", e);
      }
    }
  };

  const viewUserHandler = async (userId) => {
    try {
      let { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}user/get/${userId}`
      );
      data.isRegistration = data.isRegistration ? "Yes" : "No";
      setIsUserDetails(data);
      setViewOpenModal(true);
    } catch (e) {
      console.log("error in view user", e);
    }
  };

  const getStarHandler = async (userId) => {
    let starArr = [];
    try {
      let { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}user/level/get/${userId}`
      );
      for (let key in data) {
        if (data[key].data && data[key].data.stars) {
          // console.log(key)
          // console.log(data[key].data.stars.findIndex(p => p.stage === "final-round"))
          let index = data[key].data.stars.findIndex(
            (p) => p.stage === "final-round"
          );
          if (index !== -1) {
            starArr.push({
              level: key,
              finalRoundStar: data[key].data.stars[index].star,
            });
          }
        }
      }
      // console.log(starArr);
      setStarData(starArr);
      setOpenStarModal(true);
    } catch (e) {
      console.log("error in view user", e);
    }
  };

  const closeViewModalHandler = () => {
    setIsUserDetails(null);
    setViewOpenModal(false);
  };

  const checkExportHandler = (status) => {
    setExportStatus(status);
  };

  const getByPostCodeHandler = async (postcode) => {
    let usersList = await axios.get(
      `${process.env.REACT_APP_API_URL}user/getByPostcode/${postcode}`
    );
    usersList = usersList.data.map((element) => {
      let data = {};
      data.id = element.id;
      data.firstName = element.firstName;
      data.email = element.email;
      data.isRegistration = element.isRegistration ? "Yes" : "No";
      data.profile = element.profile;
      data.action = (
        <React.Fragment>
          <VisibilityIcon
            color="primary"
            onClick={() => {
              viewUserHandler(element.id);
            }}
          />
          <StarOutlineIcon
            color="primary"
            onClick={getStarHandler.bind(null, element.id)}
          />
          <DeleteOutlined
            color="secondary"
            onClick={() => {
              deleteUserHandler(element.id);
            }}
          />
        </React.Fragment>
      );
      return data;
    });
    setUsers(usersList);
  };

  const getByLocationHandler = async (location) => {
    let usersList = await axios.get(
      `${process.env.REACT_APP_API_URL}user/getByLocation/${location}`
    );
    usersList = usersList.data.map((element) => {
      let data = {};
      data.id = element.id;
      data.firstName = element.firstName;
      data.email = element.email;
      data.isRegistration = element.isRegistration ? "Yes" : "No";
      data.profile = element.profile;
      data.action = (
        <React.Fragment>
          <VisibilityIcon
            color="primary"
            onClick={() => {
              viewUserHandler(element.id);
            }}
          />
          <StarOutlineIcon
            color="primary"
            onClick={getStarHandler.bind(null, element.id)}
          />
          <DeleteOutlined
            color="secondary"
            onClick={() => {
              deleteUserHandler(element.id);
            }}
          />
        </React.Fragment>
      );
      return data;
    });

    setUsers(usersList);
    usersList.length > 0 ? checkExportHandler(true) : checkExportHandler(false);
  };

  const closeStarModalHandler = () => {
    setOpenStarModal(false);
  };

  const getByUserIdHandler = async (userId) => {
    try {
      let usersArray = [];
      let { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}user/get/${userId}`
      );
      data.isRegistration = data.isRegistration ? "Yes" : "No";
      data.action = (
        <React.Fragment>
          <VisibilityIcon
            color="primary"
            onClick={() => {
              viewUserHandler(data.id);
            }}
          />
          <StarOutlineIcon
            color="primary"
            onClick={getStarHandler.bind(null, data.id)}
          />
          <DeleteOutlined
            color="secondary"
            onClick={() => {
              deleteUserHandler(data.id);
            }}
          />
        </React.Fragment>
      );
      usersArray.push(data);
      setUsers(usersArray);
    } catch (e) {
      console.log("error in getByUserIdHandler", e);
    }
  };

  return (
    <>
      {isUserDetails && (
        <ViewModal
          handleClose={closeViewModalHandler}
          open={openViewModal}
          title={"View User Details"}
          userData={isUserDetails}
        />
      )}

      {
        <GetStarsFromLevel
          open={openStarModal}
          handleClose={closeStarModalHandler}
          starData={starData}
        />
      }
      <UserContext.Provider
        value={{
          users,
          locations,
          onSearchByPostcode: getByPostCodeHandler,
          onSearchByLocation: getByLocationHandler,
          exportStatus,
          onCheckExportStatus: checkExportHandler,
          onSearchByUserId: getByUserIdHandler,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
