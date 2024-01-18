"use client";

import { useEffect, useState } from "react";
import Avatar from "boring-avatars";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Controls, { Option } from "./controls";
import Modal from "./modal";

import { User } from "./types/user";

const generateUsersListSortFn = (field: string, direction: string): (a: User, b: User) => number => {
  if (!["company", "email", "name"].includes(field)) {
    throw new Error(`Unsupported sort field "${field}"`);
  }

  if (!["ascending", "descending"].includes(direction)) {
    throw new Error(`Unsupported sort direction "${direction}"`);
  }

  const sortFn = (userA: User, userB: User) => {
    let userAField
    let userBField;

    if (field === "company") {
      userAField = userA["company"]["name"];
      userBField = userB["company"]["name"];
    }

    if (field === "email") {
      userAField = userA["email"];
      userBField = userB["email"];
    }

    if (field === "name") {
      userAField = userA["name"];
      userBField = userB["name"];
    }

    if (direction === "ascending") {
      return (userAField as string).localeCompare(userBField as string)
    } 
    
    if (direction === "descending") {
      return -(userAField as string).localeCompare(userBField as string)
    }

    throw new Error();
  }

  return sortFn;
}

export type GalleryProps = {
  users: User[];
};

const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState(users);
  const [controlField, setControlField] = useState<Option | null>(null);
  const [controlDirection, setControlDirection] = useState<Option | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (id: number) => {
    const user = usersList.find((item) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!!controlField && !!controlDirection) {
      setUsersList((prevValue) => {
        const newValue = structuredClone(prevValue);
        newValue.sort(generateUsersListSortFn(controlField.value, controlDirection.value));
        return newValue;
      })
    }
  }, [controlField, controlDirection])

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls
          field={controlField}
          setField={setControlField}
          direction={controlDirection}
          setDirection={setControlDirection}
        />
      </div>
      <div className="items">
        {usersList.map((user) => (
          <div
            className="item user-card"
            key={user.id}
            onClick={() => handleModalOpen(user.id)}
          >
            <div className="body">
              <Avatar
                size={96}
                name={user.name}
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
            </div>
            <div className="info">
              <div className="name">{user.name}</div>
              <div className="company">{user.company.name}</div>
            </div>
          </div>
        ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
