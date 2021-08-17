import React from "react";

const UserContext = React.createContext({
    users: [],
    onSearchByLocation: (location)=> {},
    onSearchByPostcode: (postcode)=> {},
    exportStatus: false,
    onCheckExportStatus: (status)=> {},
    onSearchByUserId: (userId)=> {},
})

export default UserContext;