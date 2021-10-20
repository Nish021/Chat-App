import React from "react";
import { Container, Grid, Row, Col, Button, Icon, Panel, Alert } from "rsuite";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

const SignIn = () => {
  //here providers are google and facebook...
  const SignInwithProvider = async (provider) => {
    // console.log("result", result);

    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider); //it is promise. so we receive object so we destructure it

      if (additionalUserInfo.isNewUser) {
        //store in database
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success("Signed in", 4000);
    } catch (err) {
      Alert.info(err.message, 4000);
    }
  };

  const FacebookSignin = () => {
    SignInwithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const GoogleSignin = () => {
    SignInwithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                {/* <p>Progressive Chat Platform for neophytes</p> */}
              </div>

              <div className="mt-3">
                <Button block color="green" onClick={GoogleSignin}>
                  <Icon icon="google" /> Continue with Google
                </Button>

                <Button block color="blue" onClick={FacebookSignin}>
                  <Icon icon="facebook" /> Continue with Facebook
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
