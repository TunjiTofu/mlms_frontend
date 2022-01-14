import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getModulePosts = (posts) => ({
  type: ActionTypes.GET_SELECTED_MODULE_POSTS,
  payload: posts,
});

const getPostDetails = (post) => ({
  type: ActionTypes.GET_POST_DETAILS,
  payload: post,
});

export const getModulePostsInitiate = (id) => {
  return function (dispatch) {
    db.classPosts
      .orderBy("sortNumber", "asc")
      .where("module", "==", id)
      .where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const modulePosts = [];
          querySnapshot.forEach((doc) => {
            modulePosts.push({...doc.data(), id: doc.id});
          });
          dispatch(getModulePosts(modulePosts));
        } else {
          console.log("No Module Posts Found!");
        }
      });
  };
};

export const getPostDetailsInitiate = (id) => {
  return function (dispatch) {
    db.classPosts
      .doc(id)
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (querySnapshot.exists) {
          dispatch(getPostDetails({...querySnapshot.data(), id: querySnapshot.id}));
        } else {
          console.log("No Post Found!");
        }
      });
  };
};

export const resetSelectedModulePostInitiate = () => ({
  type: ActionTypes.RESET_SELECTED_MODULE_POSTS,
});

export const resetSelectedPostDetailsInitiate = () => ({
  type: ActionTypes.RESET_POST_DETAILS,
});
