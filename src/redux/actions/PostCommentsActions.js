import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getParentComment = (comments) => ({
  type: ActionTypes.GET_PARENT_COMMENTS,
  payload: comments,
});

const getChildrenComment = (childrenComments) => ({
  type: ActionTypes.GET_CHILDREN_COMMENTS,
  payload: childrenComments,
});

const getNoRecord = (noRec) => ({
  type: ActionTypes.GET_NO_RECORD,
  payload: noRec,
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
            let userId = doc.data().userId;

            db.users.doc(userId).onSnapshot((document) => {
              const userName = document.data().displayName;
              console.log("User Nameeeee", userName);

              ParentComments.push({
                ...doc.data(),
                id: doc.id,
                userName: userName,
              });
              dispatch(getParentComment(ParentComments));
            });
          });
        } else {
          console.log("No Comments!");
        }
      });
  };
};

export const getChildrenCommentsInitiate = (parentId) => {
  return function (dispatch) {
    db.postComments
      .orderBy("createdAt", "desc")
      .where("parentId", "==", parentId)
      .where("isChildComment", "==", true)
      .where("status", "==", "active")
      .onSnapshot({includeMetadataChanges: true}, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const childrenComments = [];
          querySnapshot.forEach((doc) => {
            let userId = doc.data().userId;
            db.users.doc(userId).onSnapshot((document) => {
              const userName = document.data().displayName;
              childrenComments.push({
                ...doc.data(),
                id: doc.id,
                userName: userName,
              });
              dispatch(getChildrenComment(childrenComments));
            });
          });
        } else {
          dispatch(getNoRecord("No Comment!"));
        }
      });
  };
};

export const resetParentCommentsInitiate = () => ({
  type: ActionTypes.RESET_PARENT_COMMENTS,
});

export const resetChildrenCommentsInitiate = () => ({
  type: ActionTypes.RESET_CHILDREN_COMMENTS,
});
