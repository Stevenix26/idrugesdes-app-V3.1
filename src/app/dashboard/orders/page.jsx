'use client'
import React, { useState } from "react";
import { EditIcon } from "../../EditIcon";
import { DeleteIcon } from "../../DeleteIcon";
import { EyeIcon } from "../../EyeIcon";
import { columns } from "../../data/data";

const statusColorMap = {
  submitted: "primary",
  accepted: "success",
  declined: "danger",
};

const generateRandomData = () => {
  const data = [];
  for (let i = 1; i <= 10; i++) {
    data.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: "Patient",
      status: "submitted",
      prescriptionDetails: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      reasonForCancellation: "",
    });
  }
  return data;
};

export default function Orders() {
  const [users, setUsers] = useState(generateRandomData());
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleActionClick = (action, user) => {
    setSelectedUser(user);

    if (action === "delete") {
      handleDelete();
    } else if (action === "edit") {
      handleEdit();
    } else if (action === "preview") {
      handlePreview();
    } else if (action === "accept") {
      handleAccept();
    } else if (action === "decline") {
      handleDecline();
    }
  };

  const handleDelete = () => {
    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
  };

  const handleEdit = () => {
    setModalVisible(true);
  };

  const handlePreview = () => {
    console.log(selectedUser);
  };

  const handleAccept = () => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, status: "accepted" } : user
    );
    setUsers(updatedUsers);
  };

  const handleDecline = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleReasonChange = (e) => {
    const updatedUser = { ...selectedUser, reasonForCancellation: e.target.value };
    setSelectedUser(updatedUser);
  };

  return (
    <div className="container p-5">
      <div className="row text-orange-800">
        <table aria-label="Prescription Details">
          <div className="table-header-group" columns={columns}>
            {(column) => (
              <div className="table-column" key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </div>
            )}
          </div>
          <div className="table-caption" items={users}>
            {(user) => (
              <div className="table-row" key={user.id}>
                {(columnKey) => (
                  <div className="table-cell">
                    {columnKey === "actions" ? (
                      <div className="relative flex items-center gap-2">
                        <div className="tooltip" content="Details">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => handleActionClick("preview", user)}
                          >
                            <EyeIcon />
                          </span>
                        </div>
                        <div className=" tooltip" content="Edit user">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => handleActionClick("edit", user)}
                          >
                            <EditIcon />
                          </span>
                        </div>
                        <div className=" tooltip" color="danger" content="Delete user">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => handleActionClick("delete", user)}
                          >
                            <DeleteIcon />
                          </span>
                        </div>
                        {user.status === "submitted" && (
                          <div className=" tooltip" content="Accept prescription">
                            <span
                              className="text-lg text-success cursor-pointer active:opacity-50"
                              onClick={() => handleActionClick("accept", user)}
                            >
                              ✓
                            </span>
                          </div>
                        )}
                        {user.status === "submitted" && (
                          <div  color="danger" content="Decline prescription">
                            <span
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                              onClick={() => handleActionClick("decline", user)}
                            >
                              ✗
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      user[columnKey]
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </table>
        <div className=" modal modal-scroll" visible={modalVisible} onClose={handleModalClose}>
          <div className="modal header">Decline Prescription</div>
          <div className="modal body">
            <p>Please provide a reason for declining the prescription:</p>
            <input
              className=" input input-bordered"
              type="text"
              value={selectedUser ? selectedUser.reasonForCancellation : ""}
              onChange={handleReasonChange}
              placeholder="Reason for cancellation"
            />
          </div>
          <div className="modal footer">
            <button className="btn" color="default" onClick={handleModalClose}>
              Cancel
            </button>
            <button className="btn"
              color="danger"
              onClick={() => {
                handleModalClose();
                handleDecline();
              }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
