'use client'
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Input,
  Modal,
} from "@nextui-org/react";
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
        <Table aria-label="Prescription Details">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(user) => (
              <TableRow key={user.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "actions" ? (
                      <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => handleActionClick("preview", user)}
                          >
                            <EyeIcon />
                          </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                          <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => handleActionClick("edit", user)}
                          >
                            <EditIcon />
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => handleActionClick("delete", user)}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                        {user.status === "submitted" && (
                          <Tooltip content="Accept prescription">
                            <span
                              className="text-lg text-success cursor-pointer active:opacity-50"
                              onClick={() => handleActionClick("accept", user)}
                            >
                              ✓
                            </span>
                          </Tooltip>
                        )}
                        {user.status === "submitted" && (
                          <Tooltip color="danger" content="Decline prescription">
                            <span
                              className="text-lg text-danger cursor-pointer active:opacity-50"
                              onClick={() => handleActionClick("decline", user)}
                            >
                              ✗
                            </span>
                          </Tooltip>
                        )}
                      </div>
                    ) : (
                      user[columnKey]
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Modal visible={modalVisible} onClose={handleModalClose}>
          <Modal.Header>Decline Prescription</Modal.Header>
          <Modal.Body>
            <p>Please provide a reason for declining the prescription:</p>
            <Input
              type="text"
              value={selectedUser ? selectedUser.reasonForCancellation : ""}
              onChange={handleReasonChange}
              placeholder="Reason for cancellation"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button color="default" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={() => {
                handleModalClose();
                handleDecline();
              }}
            >
              Decline
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
