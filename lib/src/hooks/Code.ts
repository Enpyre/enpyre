import { useContext } from "react";
import { CodeContext } from "../contexts/Code";

export const useCode = () => {
    return useContext(CodeContext);
};
