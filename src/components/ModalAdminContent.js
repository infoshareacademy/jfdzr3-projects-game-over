import React from "react";
import styled from "styled-components";
import firebase from "firebase";

const SpyingP = styled.p`
  color: var(--primary-light);
  margin: 8px 16px;
`;
const SpyingSpan = styled.span`
  color: var(--secondary);
  float: right;
`;

// Getting collection of users from firestore DB
setTimeout(function () {
  firebase
    .firestore()
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("Collection of Users:", doc.id, " => ", doc.data());
      });
    });
}, 500);

const ModalAdminContent = () => {
  return (
    <div style={{backgroundColor: "inherit"}}>
      <SpyingP>
        Version of the browser: <SpyingSpan>{navigator.appVersion}</SpyingSpan>
      </SpyingP>
      <SpyingP>
        Platform the browser is compiled: <SpyingSpan>{navigator.platform}</SpyingSpan>
      </SpyingP>
      <SpyingP>
        Engine name of the browser: <SpyingSpan>{navigator.product}</SpyingSpan>
      </SpyingP>
      <SpyingP>
        Display resolution: <SpyingSpan>{window.screen.width + " x " + window.screen.height + " pixels"}</SpyingSpan>
      </SpyingP>
      <SpyingP>
        Color depth: <SpyingSpan>{window.screen.colorDepth + " bits/pixel"}</SpyingSpan>
      </SpyingP>
    </div>
  );
};

export default ModalAdminContent;
