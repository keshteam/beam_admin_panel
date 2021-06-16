import React from "react";

const PostcodeContext = React.createContext({
    postcodes: [],
    locations: [],
    onSearchByLocation: (location)=> {},
    onBulkDeleteByLocation: (location)=> {},
    onSearchByPostcode: (postcodeName)=> {},
    onAddUser: (payload)=> {},
    onGetAllPostcodes: ()=> {},
    onAddLocation: ()=> {},
})

export default PostcodeContext;