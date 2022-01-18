import {combineReducers} from "redux";
import classDetailsReducer from "./classDetailsReducer";
import classMemberListReducer from "./classMembersListReducer";
import classModuleReducer from "./classModuleReducer";
import classPostsReducer from "./classPostsReducers";
import postCommentsReducer from "./postCommentsReducer";
import userReducer from "./userReducer";
// import {classReducer} from "./classReducer";
// import { userReducer } from "./userReducer";
// import {firestoreReducer} from 'redux-firestore';

const reducers = combineReducers({
  // allClasses: classReducer,
  // currUser: userReducer,
  // firestore: firestoreReducer,
  classMemberLists: classMemberListReducer,
  selectedClassDetails: classDetailsReducer,
  selectedClassModules: classModuleReducer,
  selectedModulePosts: classPostsReducer,
  contentComments: postCommentsReducer,
  dbUser: userReducer,
});

export default reducers;
