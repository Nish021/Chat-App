import React from "react";
import { Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useModalState } from "../../misc/custom-hooks";

const DashBoardToggle = () => {
  const { isOpen, close, open } = useModalState();

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> DashboardToggle
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
