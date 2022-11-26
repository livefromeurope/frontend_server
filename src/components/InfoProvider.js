
import {createContext, useState} from "react";


const InfoContext = createContext({});

export const InfoProvider = ({children}) => {

    const [info, setInfo] = useState({boolean:false, info:'test'});

    return(
        <InfoContext.Provider value={{info, setInfo}}>
            {children}
        </InfoContext.Provider>
    )
}


export default InfoContext;