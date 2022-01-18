import {db} from "../../firebase";
import {ActionTypes} from "../constants/action-types";

const getClassMembersList = (classes) => ({
  type: ActionTypes.GET_CLASS_MEMBERS_LIST,
  payload: classes,
});

const addClassMember = () => ({
  type: ActionTypes.ADD_CLASS_MEMEBER,
});

export const getClassMembersListInitiate = (id) => {
  return function (dispatch) {
    db.classesMembers.where("userId", "==", id).onSnapshot((querySnapshot) => {
      if (!querySnapshot.empty) {
        const classListArray = [];
        querySnapshot.forEach((doc) => {
          const classId = doc.data().classId;
          db.classes.doc(classId).onSnapshot((document) => {
            // document.forEach((classDoc)=>{
            classListArray.push({...document.data(), id: classId});
            dispatch(getClassMembersList(classListArray));

            // })
          });
        });
      } else {
        console.log("You have not joined any class");
      }
    });
  };
};

export const addClassMemberInitiate = (content) => {
  return function (dispatch) {
    console.log("Contentsssss ", content);


    db.classes
        .where("classCode", "==", content.classCode)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              const classIdentity = doc.id;
              const data = {
                classId: classIdentity,
                // classRef: db.classesRefDoc.doc('classes/' + classIdentity),
                userId: content.userId,
                joinedAt: db.getCurrentTimeStamp,
              };
              const uniqueId = classIdentity + "-" + data.userId;
              //Set Data to firestore table
              db.classesMembers
                .doc(uniqueId)
                .set(data)
                .catch((e) => {
                  console.log("Unable to join class. Try again  - " + e);
                });

              //check for changes in snapshot
              // db.classesMembers.onSnapshot(
              //   {includeMetadataChanges: true},
              //   (snapshot) => {
              //     snapshot.docChanges().forEach((change) => {
              //       // console.log("Update Dataaaaaaaa: ", change);
              //       if (change.type === "modified") {
              //         // setError("");
              //         console.log("You have successfully joined the class");
              //         // setForceUpdate(); //force to trigger Usestate
              //         window.location.reload(true); //Force a page reload
              //       }
              //     });
              //   }
              // );
            });
          } else {
            console.log("Class Not Found! Please try again!");
          }
        })
        .catch((e) => {
          console.log("Error Joining Class, Please try again!");
          console.log(e);
        });
      // setLoading(false);
      // onSubmitProps.resetForm();
      // onSubmitProps.setSubmitting(false);

      dispatch(addClassMember());



    // db.postComments
    //   .doc()
    //   .set(content)
    //   dispatch(sendParentReply())
  };
};
