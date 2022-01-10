import React, { useCallback, useState } from "react";
import { Input, InputGroup, Icon, Alert } from "rsuite";
import firebase from "firebase/app";
import { useParams } from "react-router";
import { useProfile } from "../../../context/profile.context.js";
import { database } from "../../../misc/firebase.js";

function assembledMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}), //if its avatar then spread the avatar.profile there
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  };
}

const ChatBottom = () => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { chatId } = useParams();
  const { profile } = useProfile();

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === "") {
      return;
    }

    //we need to assembled the message
    const msgData = assembledMessage(profile, chatId);
    msgData.text = input;

    //last message to display in chat room list.
    const updates = {};

    //this way we will get a unique key from realtime db without creating the actual document
    const messageId = database.ref("messages").push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };

    setIsLoading(true);
    //update the Actual Database
    try {
      await database.ref().update(updates);
      setInput(" ");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.messageId);
    }
  };

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  };
  return (
    <div>
      <InputGroup>
        <Input
          placeholder="Write a new message here..."
          value={input}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />

        <InputGroup.Button
          color="blue"
          appearence="primary"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
