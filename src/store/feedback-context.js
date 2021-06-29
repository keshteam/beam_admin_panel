import React from "react";

const FeedbackContext = React.createContext({
    users: [],
    locations: [],
    onCheckExportStatus : () => {},
    onSearchByLocation : () => {},
    onSearchByLevel : () => {},
})

export default FeedbackContext;