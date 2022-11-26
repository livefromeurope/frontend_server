import { useContext } from "react";
import InfoContext from "./InfoProvider";


const useInfo = () => {
    return useContext(InfoContext);
}

export default useInfo;