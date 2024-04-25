import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import styles from "./index.module.css";
import { User, userList } from "../../api/chatinfo";
import ChatMessage from "./message";



const ChatApp: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>();
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    searchUser()
  }, [])

  const searchUser = async () => {
    const data = await userList(searchName);
    if (data) {
      setUsers([...data])
    }
  };

  const showChat = (user: User) => {
    setShowModal(true);
    setUser(user)
  }
  return (
    <>
      <Row className="d-flex justify-content-between align-items-center" style={{height: "50px"}}>
        <Col md={3}>
          <InputGroup>
            <Form.Control placeholder="username" value={searchName}
                          onChange={(e: { target: { name: string; value: string; }; }) => {
                            setSearchName(e.target.value)
                          }}/>
            <Button variant="outline-secondary" id="button-addon2" onClick={searchUser}>
              search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        {users.map(u => (
          <Col md={2}>
            <div key={u.id}
                 className={styles['received-message']} style={{margin: "10px", cursor: "pointer"}}
                 onClick={() => showChat(u)}>
              <div className={styles.name}>
                {u.username?.charAt(0).toUpperCase()}
              </div>
              <b>{u.username}</b>
            </div>
          </Col>
        ))}
      </Row>
      {showModal &&
        <Modal show={showModal} size={"xl"} onHide={() => setShowModal(false)} centered>
          {user && <ChatMessage u={user}/>}
        </Modal>
      }
    </>
  );
};

export default ChatApp;
