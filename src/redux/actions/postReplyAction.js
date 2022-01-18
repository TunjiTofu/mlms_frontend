import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const sendParentReply = () => ({
  type: ActionTypes.SEND_PARENT_REPLY,
  //   payload: comments,
});

const sendChildReply = () => ({
    type: ActionTypes.SEND_CHILD_REPLY,
    //   payload: comments,
  });

export const sendParentReplyInitiate = (replyContent) => {
  return function (dispatch) {
    db.postComments
      .doc()
      .set(replyContent)
      dispatch(sendParentReply())
  };
};

export const sendChildReplyInitiate = (replyContent) => {
    return function (dispatch) {
      db.postComments
        .doc()
        .set(replyContent)
        dispatch(sendChildReply())
    };
  };
// export const resetParentCommentsInitiate = () => ({
//   type: ActionTypes.RESET_PARENT_COMMENTS,
// });

// export const resetChildrenCommentsInitiate = () => ({
//   type: ActionTypes.RESET_CHILDREN_COMMENTS,
// });
