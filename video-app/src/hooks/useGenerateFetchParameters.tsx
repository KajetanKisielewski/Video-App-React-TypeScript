/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { generateFetchParameters } from "../helpers/auxiliaryFunctions";

import { GeneratedParameters } from "../types/types";

const useGenerateFetchParameters = () => {
  const [urlList, setUrl] = React.useState<string[] | null>(null);

  const generatedParameters: GeneratedParameters = [];

  React.useEffect(() => {
    if (!urlList) return;

    urlList.forEach((url) => {
      const generatedParameter = generateFetchParameters(url);
      generatedParameters.push(generatedParameter);
    });
  }, [urlList]);

  return [setUrl, generatedParameters] as const;
};

export default useGenerateFetchParameters;
