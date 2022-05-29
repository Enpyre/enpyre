import { useContext } from "react";
import { AppContext } from "../contexts/App";

export const useApp = () => {
    return useContext(AppContext);
};
