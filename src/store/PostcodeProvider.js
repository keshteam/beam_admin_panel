import React, { 
    useState, 
    useEffect 
} from "react";
import PostcodeContext from './postcode-context';
import axios from "axios";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

const PostcodeProvider = (props)=> {
  const [postcodes, setPostcodes] = useState([]);
  const [locations, setLocations] = useState([]);

  const deletePostcodeHandler = async (postcodeId) => {
      if (window.confirm("Are you sure want to delete?")) {
        try {
          let { data } = await axios.delete(
            `${process.env.REACT_APP_API_URL}postcode/delete/${postcodeId}`
          );
  
          setPostcodes((prevPostcodes) => {
            let prevdata = [...prevPostcodes];
            var index = prevdata.findIndex((data) => data.id === postcodeId);
            console.log(index);
            if (index !== -1) {
              prevdata.splice(index, 1);
              return prevdata;
            }
          });
  
          alert(data);
        } catch (error) {
          console.log("error in deletePostcodeHandler", error);
        }
      }
  };

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
      const getPostcodesList = async () => {
        try {
          let { data } = await axios.get(
            process.env.REACT_APP_API_URL + "postcode/getAll"
          );
          data.map((element) => {
            return (element.action = (
              <React.Fragment>
                <DeleteOutlined
                  color="secondary"
                  onClick={() => {
                    deletePostcodeHandler(element.id);
                  }}
                />
              </React.Fragment>
            ));
          });
          setPostcodes(data);
        } catch (e) {
          console.log("error in getUserList", e);
        }
      };
      getPostcodesList();
  
      return () => {
        console.log("clean up");
      };
  }, [setPostcodes]);

  const searchHandlerByLocation = async(location)=>{
    try{
      const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}postcode/getAllByLocation/${location}`
      );
      data.map((element) => {
        return (element.action = (
          <React.Fragment>
            <DeleteOutlined
              color="secondary"
              onClick={() => {
                deletePostcodeHandler(element.id);
              }}
            />
          </React.Fragment>
        ));
      });
      setPostcodes(data);
    }catch(error){
      console.log("error in get postcodes by location", error);
    }
  } 

  const bulkDeleteHandlerByLocation = async(location)=>{
    try{
      let { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}postcode/deleteMany/${location}`
      );
      if(data.deletedCount > 0){
        alert('Deleted Successfully');
        setLocations((prevLocation)=>{
          let prevList = [...prevLocation];
          let newList = prevList.filter(e=>{
            return e !== location;
          })
          return newList;
        })
        getAllPostcodes();
      }
    }catch(error){
      console.log("error in bulkDeleteHandlerByLocation", error);
    }
  }

  const getAllPostcodes = async () => {
    try {
      let { data } = await axios.get(
        process.env.REACT_APP_API_URL + "postcode/getAll"
      );
      data.map((element) => {
        return (element.action = (
          <React.Fragment>
            <DeleteOutlined
              color="secondary"
              onClick={() => {
                deletePostcodeHandler(element.id);
              }}
            />
          </React.Fragment>
        ));
      });
      setPostcodes(data);
    } catch (e) {
      console.log("error in bulkDeleteHandler", e);
    }
  };

  const searchByNameHandler = async(postcodeName)=>{
    try {
      let { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}postcode/get/${postcodeName}`
      );
      if(data){
        data.action = (
          <React.Fragment>
            <DeleteOutlined
              color="secondary"
              onClick={() => {
                deletePostcodeHandler(data.id);
              }}
            />
          </React.Fragment>
        );
        setPostcodes([data]);
      }else{
        alert('No Data Found')
      }
      
    } catch (error) {
      console.log("error in find postcode", error);
    }
  }

  const addUserHandler = (data) => {
    data.action = (
      <React.Fragment>
        <DeleteOutlined
          color="secondary"
          onClick={() => {
            deletePostcodeHandler(data.id);
          }}
        />
      </React.Fragment>
    );
    setPostcodes((prevPostcodes) => {
      return [...prevPostcodes, data];
    });
  };

  const getNewLocation = (fileName)=> {
    const fileNameArr = fileName.split('.')
    const newLocation = fileNameArr[0];
    if(locations.indexOf(newLocation) === -1){
      setLocations((prevLocations) => {
        return [...prevLocations, newLocation];
      });
    }   
  }

  return (
      <PostcodeContext.Provider 
        value={{
          postcodes,
          onSearchByLocation: searchHandlerByLocation,
          onBulkDeleteByLocation: bulkDeleteHandlerByLocation,
          locations,
          onSearchByPostcode: searchByNameHandler,
          onAddUser: addUserHandler,
          onGetAllPostcodes: getAllPostcodes,
          onAddLocation: getNewLocation,
        }}
      >
          {props.children}
      </PostcodeContext.Provider>
  )
    
}
export default PostcodeProvider;