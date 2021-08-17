import React from "react";
import { Button, Modal } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import ProfileAvatar from "../../dashboard/ProfileAvatar";

const ProfileInfoBtnModal = ({ profile, ...btnProps }) => {
  const shortname = profile.name.split(" ")[0];
  const { isOpen, open, close } = useModalState();
  const { name, avatar, createdAt } = profile;
  const memberSince = new Date(createdAt).toLocaleDateString();

  return (
    <>
      <Button {...btnProps} onClick={open}>
        {shortname}
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{shortname} profile</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          <ProfileAvatar
            src={avatar}
            name={name}
            className="width-200 height-200 img-fullsize font-huge"
          />
          <h4 className="mt-2">{name}</h4>
          Member since {memberSince}
        </Modal.Body>

        <Modal.Footer>
          <Button block onClick={close}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
