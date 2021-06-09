import React from "react";

const PostcodeContext = React.createContext({
    postcodes: [],
    locations: [],
    onSearchByLocation: (location)=> {},
    onBulkDeleteByLocation: (location)=> {},
    onSearchByPostcode: (postcodeName)=> {},
    onAddUser: (payload)=> {},
    onGetAllPostcodes: ()=> {},
})

export default PostcodeContext;