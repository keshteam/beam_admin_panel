import React from "react";

const UserContext = React.createContext({
    users: [],
    onSearchByLocation: (location)=> {},
    onSearchByPostcode: (postcode)=> {},
})

export default UserContext;