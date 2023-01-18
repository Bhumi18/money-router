import React, { useState } from "react";
import CreateFFC from "./CreateFFC";
import DeleteFFC from "./DeleteFFC";
import UpdateFFC from "./UpdateFFC";
import Withdraw from "./Withdraw";

import "../styles/dashboard.scss";
import "../styles/subscriber.scss";

function FlowFromContract() {
  const [showCreateFlow, setCreateFlow] = useState(true);
  const [showUpdateFlow, setUpdateFlow] = useState(false);
  const [showDeleteFlow, setDeleteFlow] = useState(false);
  const [showWithdraw, setWithdraw] = useState(false);

  return (
    <div className="db-main">
      <div className="subscriber-header">
        <button
          className={
            showCreateFlow
              ? "subscriber-header-btn active"
              : "subscriber-header-btn"
          }
          onClick={() => {
            setCreateFlow(true);
            setUpdateFlow(false);
            setDeleteFlow(false);
            setWithdraw(false);
          }}
        >
          Create
        </button>
        <button
          className={
            showUpdateFlow
              ? "subscriber-header-btn active"
              : "subscriber-header-btn"
          }
          onClick={() => {
            setCreateFlow(false);
            setUpdateFlow(true);
            setDeleteFlow(false);
            setWithdraw(false);
          }}
        >
          Update
        </button>
        <button
          className={
            showDeleteFlow
              ? "subscriber-header-btn active"
              : "subscriber-header-btn"
          }
          onClick={() => {
            setCreateFlow(false);
            setUpdateFlow(false);
            setDeleteFlow(true);
            setWithdraw(false);
          }}
        >
          Delete
        </button>
        <button
          className={
            showWithdraw
              ? "subscriber-header-btn active"
              : "subscriber-header-btn"
          }
          onClick={() => {
            setCreateFlow(false);
            setUpdateFlow(false);
            setDeleteFlow(false);
            setWithdraw(true);
          }}
        >
          Withdraw
        </button>
      </div>
      {showCreateFlow ? (
        <CreateFFC />
      ) : showUpdateFlow ? (
        <UpdateFFC />
      ) : showDeleteFlow ? (
        <DeleteFFC />
      ) : showWithdraw ? (
        <Withdraw />
      ) : null}
    </div>
  );
}

export default FlowFromContract;
