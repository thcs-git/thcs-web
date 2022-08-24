// import React from 'react';
// import ReactDOM from 'react-dom';
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import { createRoot } from "react-dom/client";
import React from "react";
// const container = document.getElementById("app") as HTMLDivElement;
const container = document.getElementById("root");
if (container === null) throw new Error("Root container missing in index.html");
const root = createRoot(container);
root.render(<App />);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
