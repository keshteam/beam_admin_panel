import React from "react";

const UserContext = React.createContext({
    users: [],
    onSearchByLocation: (location)=> {},
    onSearchByPostcode: (postcode)=> {},
    exportStatus: false,
    onCheckExportStatus: (status)=> {},
})

export default UserContext;