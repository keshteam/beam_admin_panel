import React, { useRef, useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import ErrorModal from '../../UI/ErrorModal/ErrorModal';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const intialErrorVal = {
  title : '',
  message : '',
  openModal: false
}
const errorReducer = (state, action)=> {
  if(action.type === 'INVALID_FILE'){
    return { 
      title : 'Invalid File',
      message : 'Please select only XLSX file',
      openModal: true
    }
  }
  if(action.type === 'CLOSE_ERROR_MODAL'){
    return intialErrorVal;
  }
  return intialErrorVal; 
}

const BulkPostcodeUpload = (props) => {
  const classes = useStyles();
  const xlsxFileRef = useRef();

  const [errorState, dispatchError] = useReducer(errorReducer, intialErrorVal)

  const closeErrorHandler = ()=> {
    dispatchError({
      type: 'CLOSE_ERROR_MODAL',
    })
  }

  const uploadXlsxHandler = async() => {
    if (
      xlsxFileRef.current.files[0] &&
      xlsxFileRef.current.files[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      let formData = new FormData();
      formData.append('file', xlsxFileRef.current.files[0]);
      const {data} = await axios.post(process.env.REACT_APP_API_URL+'postcode/bulkInsert', formData);
      alert(data);
      xlsxFileRef.current.value = null;
      props.onBulkUploadHandler();
    } else {
      dispatchError({
        type: 'INVALID_FILE',      
      })
    }
  };

  return (
    <React.Fragment>
      { errorState.openModal && <ErrorModal handleClose={closeErrorHandler} open={errorState.openModal} title={errorState.title} message={errorState.message}/> }
      <div className={classes.root}>
        <FormControl>
          <Input type="file" inputRef={xlsxFileRef} />
        </FormControl>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={uploadXlsxHandler}
        >
          Upload
        </Button>
      </div> 
    </React.Fragment>
  );
};

export default BulkPostcodeUpload;
