import React, { useState, useRef } from "react";
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

const BulkPostcodeUpload = () => {
  const classes = useStyles();
  const xlsxFileRef = useRef();
  const [isError, setIsError] = useState();
  const [openModal, setOpenModal] = useState(true);

  const closeErrorHandler = ()=> {
    setOpenModal(false);
    setIsError(null)
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
    } else {
      setOpenModal(true);
      setIsError({
        title: "Invalid File",
        message: "Please select only XLSX file"
      })
    }
  };

  return (
    <React.Fragment>
      { isError && <ErrorModal handleClose={closeErrorHandler} open={openModal} title={isError.title} message={isError.message}/> }
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
      </div> <br />
    </React.Fragment>
  );
};

export default BulkPostcodeUpload;
