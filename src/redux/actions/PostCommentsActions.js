import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getParentComment = (comments) => ({
  type: ActionTypes.GET_PARENT_COMMENTS,
  payload: comments,
});


export const getParentCommentsInitiate = (id) => {
  return function (dispatch) {
    db.postComments
    .orderBy("createdAt", "desc")
    .where("postId", "==", id)
    .where("isParentComment", "==", true)
    .where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const ParentComments = [];
          querySnapshot.forEach((doc) => {
            ParentComments.push({...doc.data(), id: doc.id});
          });
          dispatch(getParentComment(ParentComments));
        } else {
          console.log("No Comments!");
        }
      });
  };
};


export const resetParentCommentsInitiate = () => ({
  type: ActionTypes.RESET_PARENT_COMMENTS,
});


