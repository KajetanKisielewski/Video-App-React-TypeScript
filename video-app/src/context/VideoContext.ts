import React from "react";

import { VideoContextValues } from "../types/types";

const VideoContext = React.createContext<VideoContextValues | undefined>(
  undefined
);

export default VideoContext;
