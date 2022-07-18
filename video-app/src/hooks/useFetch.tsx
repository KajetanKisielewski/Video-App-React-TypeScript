import React from "react";

import { fetchReducer } from "../reducer";
import { setInitState } from "../helpers/auxiliaryFunctions";

import { GeneratedParameters, FetchState } from "../types/types";

const useFetch = (generatedParameters: GeneratedParameters): FetchState => {
  const [state, dispatch] = React.useReducer(fetchReducer, setInitState());

  React.useEffect(() => {
    generatedParameters.forEach((item) => {
      const [path, options = { method: "GET" }] = item;

      dispatch({ type: "API_REQUEST" });

      fetch(path as string, options as {})
        .then((resp) => {
          if (resp.ok) return resp.json();

          return Promise.reject(resp);
        })
        .then((resp) => {
          dispatch({ type: "FETCH_DATA", payload: resp });
        })
        .catch((err) => {
          dispatch({ type: "ERROR", payload: err });
        });
    });
  }, [generatedParameters]);

  return state;
};

export default useFetch;
