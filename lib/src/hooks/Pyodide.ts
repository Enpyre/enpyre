import { useContext } from "react";
import { PyodideContext } from "../contexts/Pyodide";

export const usePyodide = () => {
    return useContext(PyodideContext);
};
