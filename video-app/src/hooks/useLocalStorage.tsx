import { VideoState } from "../types/types";

const useLocalStorage = (): [Function, Function] => {
  const setLocalStorage = (videoData: VideoState[]) => window.localStorage.setItem("videoData", JSON.stringify(videoData));

  const getLocalStorage = (): VideoState[] => JSON.parse(window.localStorage.getItem("videoData") as string);

  return [getLocalStorage, setLocalStorage];
};

export default useLocalStorage;
