import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import logger from "redux-logger";
// import {reduxFirestore, getFirestore} from "redux-firestore";
// import {reactReduxFirebase, getFirebase} from "react-redux-firebase";
// import fbConfig from "../fbConfig";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];
if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

// const store = createStore(
//   reducers,
//   composeEnhancers(
//     applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//     reduxFirestore(fbConfig)
//   )
// );

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;
