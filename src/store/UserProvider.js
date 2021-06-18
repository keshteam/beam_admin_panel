import React, { useEffect, useState } from "react";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import UserContext from "./user-context";
import axios from "axios";
import ViewModal from "../UI/ViewModal/ViewModal";

const UserProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState();
  const [isUserDetails, setIsUserDetails] = useState();
  const [openViewModal, setViewOpenModal] = useState(false);
  const [locations, setLocations] = useState([]);

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

  const closeViewModalHandler = () => {
    setIsUserDetails(null);
    setViewOpenModal(false);
  };

  const getByPostCodeHandler = async(postcode)=> {
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
  }

  const getByLocationHandler = async(location)=> {
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
  }

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
      <UserContext.Provider
        value={{
          users,
          locations,
          onSearchByPostcode: getByPostCodeHandler,
          onSearchByLocation: getByLocationHandler
        }}
      >
        {props.children}
      </UserContext.Provider>
    </>
  );
};

export default UserProvider;
