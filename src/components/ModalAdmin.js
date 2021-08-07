// Component for Admin administration

import React, {useState, useEffect} from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "../stylings/modals.css";
import firebase from "firebase";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: "550px",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          style={{
            backgroundColor: "var(--secondary)",
            color: "whitesmoke",
            float: "right",
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ModalAdmin() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //* Getting data from firestore
  const userLoggedIn = firebase.auth().currentUser;
  const uid = userLoggedIn?.uid;
  console.log("userLoggedIn.uid:", uid);
  // Setting up the state
  const [userInfo, setUserInfo] = useState({
    isAdmin: "",
  });

  // UseEffect + getting the user's data
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        console.log("User's data - isAdmin:", doc.data().isAdmin, "User's uid:", uid);
        setUserInfo(doc.data());
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [uid]);

  let userRole = "User";
  if (userInfo.isAdmin === true) {
    userRole = "Admin";
  }

  console.log("userRole", userRole);

  if (userRole === "Admin") {
    return (
      <div>
        <Button className="Admin" onClick={handleClickOpen}>
          Admin Only
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            style={{backgroundColor: "var(--primary-light)", color: "whiteSmoke"}}
          >
            Administration
          </DialogTitle>
          <DialogContent style={{backgroundColor: "whiteSmoke", padding: "16px"}}>
            <Typography style={{color: "black", margin: "8px 16px"}}>You have permissions of {userRole}:</Typography>
            <Typography style={{color: "black", margin: "8px 16px"}}>List of users:</Typography>
          </DialogContent>
          <DialogActions style={{backgroundColor: "whiteSmoke", float: "right"}}>
            <Button autoFocus onClick={handleClose} className="UserInfoOk">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  } else {
    return null;
  }
}
