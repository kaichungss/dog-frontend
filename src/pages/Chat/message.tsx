import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import styles from "./index.module.css";
import { addChat, list, Message, User } from "../../api/chatinfo";


const ChatMessage: React.FC<{ u: User }> = ({u}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    const newMessageObj: Message = {
      text: newMessage,
      sender_id: Number(localStorage.getItem("id")),
      receive_id: u.id,
      sender_name: localStorage.getItem("username") || '',
      receive_name: u.username,
      insert_time: new Date()
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    await addChat(newMessageObj)
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    }
  };
  useEffect(() => {
    search()
    const intervalId = setInterval(search, 1000);
    return () => clearInterval(intervalId);
  }, [])

  const search = async () => {
    const data = await list(u.id);
    if (data) {
      setMessages([...data])
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{u.username}</Modal.Title>
      </Modal.Header>
      <Row>
        <Col md={8} className="mx-auto">
          <div className="chat-box-container" style={{height: '50vh', overflowY: 'scroll'}}>
            {messages.map(message => (
              <div key={message.id}
                   className={message.sender_id === Number(localStorage.getItem("id")) ? styles['sent-message'] : styles['received-message']}>
                <div className={styles.name}>
                  {message.sender_name?.charAt(0).toUpperCase()}
                </div>
                <div className={styles.message}>
                  <div className={styles.time}>{new Date(message.insert_time).toLocaleString()}</div>
                  <h5>
                    <pre style={{
                      marginBottom: 0,
                      fontSize: "20px",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word"
                    }}>{message.text}</pre>
                  </h5>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>
          <Form className="mt-3 text-center" style={{paddingBottom: "10px"}}>
            <Form.Control
              as="textarea" rows={3}
              placeholder="type your message..."
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
            />
            <Button variant="primary" className="mt-2" onClick={handleSendMessage}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChatMessage;
