import React from 'react';
import { generateFetchParameters } from '../helpers/auxiliaryFunctions';

const useFetchParametersGenerate = () => {
    const [urlList, setUrl] = React.useState(null);

    const generatedParameters = [];

    React.useEffect(() => {
        if (!urlList) return;

        urlList.forEach((url) => {
            const generatedParameter = generateFetchParameters(url);
            generatedParameters.push(generatedParameter);
        });
    }, [urlList]);

    return [setUrl, generatedParameters];
};

export default useFetchParametersGenerate;
