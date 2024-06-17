import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserContext from "./Context/UserContext";
import ProfileContext from "./Context/ProfileContext";
import CommentContext from "./Context/CommetContext";
import { store } from "./redux/store";

import { Provider } from "react-redux";

import storage from "redux-persist/lib/storage";
import User from "./Context/UserContext";
import ProflePicContext from "./Context/ProflePicContext";
import CurrentChatContext from "./Context/ChatContext";




const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Provider store={store}>
    <ProfileContext>
       
          <UserContext>
            <CommentContext>
              <User>
                <ProflePicContext>
                  <CurrentChatContext>
                    <App />
                  </CurrentChatContext>
                </ProflePicContext>
              </User>
            </CommentContext>
          </UserContext>
       
    </ProfileContext>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
