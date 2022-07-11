const useLocalStorage = () => {
    const setLocalStorage = (videoData) =>
        window.localStorage.setItem('videoData', JSON.stringify(videoData));

    const getLocalStorage = () => JSON.parse(window.localStorage.getItem('videoData'));

    return [getLocalStorage, setLocalStorage];
};

export default useLocalStorage;
