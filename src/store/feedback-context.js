import React from "react";

const FeedbackContext = React.createContext({
    users: [],
    locations: [],
    onCheckExportStatus : () => {},
    onLevelExportStatus : () => {},
    onSearchByLocation : () => {},
    onSearchByLevel : () => {},
})

export default FeedbackContext;