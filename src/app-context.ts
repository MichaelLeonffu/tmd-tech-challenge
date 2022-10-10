import React, { useContext } from "react";

interface AppContextType {
}

const AppContext = React.createContext<null | AppContextType>(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContextType;
}

export default AppContext;