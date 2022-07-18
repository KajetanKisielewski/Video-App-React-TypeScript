# React - Video App

- [Overview](#overview)
  - [Links](#links)
  - [The challenge](#the-challenge)
  - [Features](#features)
  - [Built with](#built-with)
- [Installation and configuration](#installation-and-configuration)
- [Solutions](#solutions)
- [Author](#author)


## Overview

![](./src/assets/animation.gif)


### Links:

- Live: [Check it out](https://kajetankisielewski.github.io/video-app/)


### The challenge

The task was to create an application for stored videos from youtube or vimeo.

### Features

- **Adding videos to video list by seting youtube/vimeo URL or youtubeID**
- **Uploading a demo of video list**
- **Display selection: list or tiles**
- **"Favorites only" filter**
- **Sorting from eldest/newest**
- **Ability to clear all videos**
- **Pagination**
- **Videos management:**
    - **Watch video**
    - **Delate video**
    - **Add video to favorites**
    - **Remove video from favorites**

### Built with
![ HTML5 ](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![ CSS3 ](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![ JavaScript ](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![ React ](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![ ReactStrap ](https://img.shields.io/badge/REACT%20STRAP-6f736d?style=for-the-badge&logo&logoColor=white)
![ TypeScript ](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ Webpack ](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![ Babel ](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)
![ BEM Methodology ](https://img.shields.io/badge/BEM%20Methodology-29BDfD?style=for-the-badge&logo=BEM&logoColor=white)
![ REST API ](https://img.shields.io/badge/REST%20API-4f736d?style=for-the-badge&logoColor=white)
![ Node.js ](https://img.shields.io/badge/Node.JS-339933?style=for-the-badge&logo=Node.js&logoColor=white)
![ npm ](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)


## Installation and configuration

If you want to try a project, download it then use the command below in terminal to install

````
npm i
````
&nbsp;


An additional task will be to create the `.env` file in the `./src` folder. The file should have the following structure:

````
REACT_APP_YOUTUBE_API_KEY=yourAPIKey
REACT_APP_VIMEO_API_KEY=yourAPIKey

````


If you don't know how to generate a token, see this links: [youtube](https://developers.google.com/youtube/v3/getting-started) , [vimeo](https://developer.vimeo.com/api/guides/start)

&nbsp;

To start the development mode use command below:

````
npm start
````
&nbsp;


## Solutions

- **React Portals** - I decided on this solution because I wanted the modal to be an independent component, always appearing above other components.
- **React Reducer** - This solution is used in two cases: the fetch state and videos state handlers. It allowed me to better manage the state logic and optimize the performance of the components that run deep updates, because instead of passing callback functions I only use dispatch.
- **React Context** - In order to avoid prop drilling.
- **React Memo** - I used this in conjunction with context to avoid costly computation on every render.

## Author

- Github - [Kajetan Kisielewski](https://github.com/KajetanKisielewski)
- LinkedIn - [Kajetan Kisielewski](https://www.linkedin.com/in/kajetan-kisielewski-157b60208/)
