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

            dispatch(getParentComment(ParentComments));
            // let parentId = doc.id;
            // db.postComments
            //   .orderBy("createdAt", "desc")
            //   .where("parentId", "==", parentId)
            //   .where("isChildComment", "==", true)
            //   .where("status", "==", "active")
            //   .onSnapshot({includeMetadataChanges: true}, (qSnapshot) => {
            //     if (!qSnapshot.empty) {
            //       const childrenComments = [];
            //       qSnapshot.forEach((qdoc) => {
            //         childrenComments.push({...qdoc.data(), id: qdoc.id});
            //       });
            //       dispatch(getChildrenComment(childrenComments));
            //     } 
            //     // else {
            //     //   console.log("No Children Comments!");
            //     // }
            //   });
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
            childrenComments.push({...doc.data(), id: doc.id});
          });
          dispatch(getChildrenComment(childrenComments));
        } else {
          console.log("No Children Comments!");
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
