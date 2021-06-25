import React from "react";

const FeedbackContext = React.createContext({
    users: [],
    locations: [],
    onCheckExportStatus : () => {},
    onSearchByLocation : () => {},
})

export default FeedbackContext;