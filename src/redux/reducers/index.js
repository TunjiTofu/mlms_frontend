import {combineReducers} from "redux";
import classMemberListReducer from "./classMembersListReducer";
// import {classReducer} from "./classReducer";
// import { userReducer } from "./userReducer";
// import {firestoreReducer} from 'redux-firestore';

const reducers = combineReducers({
  // allClasses: classReducer,
  // currUser: userReducer,
  // firestore: firestoreReducer,
  classMemberLists: classMemberListReducer
});

export default reducers;
