# My Component Framework
Proof of concept for a better react-like framework

React is based on a work loop design, that is why it is not REACTIVE.
For example, states are updated asynchronously.

So I have developed a proof of concept around the Observer design pattern to develop a react-like library where the render is done after an updated state event is fired.

This project has only one dependency - uuid - to get a unique id for each component, still you can see working TSX components, some with State handling, automatic rerendering, etc...

**You can use full JSX syntax and the core framework is less than 70 lines**

## How to test it ?
Just get the public directory and launch your favorite http server to serve index.html

## How to play with it ?
Download the project, create your own components, modify the existing ones, then build the public/dist/bundle.js file : ``` yarn build ```
and serve the index.html

You only need to import the createElement in your JSX/TSX file because this is the custom pragma that will convert JSX to JS.
