import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const sendParentReply = () => ({
  type: ActionTypes.SEND_PARENT_REPLY,
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

// export const resetParentCommentsInitiate = () => ({
//   type: ActionTypes.RESET_PARENT_COMMENTS,
// });

// export const resetChildrenCommentsInitiate = () => ({
//   type: ActionTypes.RESET_CHILDREN_COMMENTS,
// });
