import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

interface Message {
  id: number;
  text: string;
  sender: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessageObj: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'Me',
    };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (

    <Row>
      <Col md={12}>
        <div className="chat-box" style={{height: '50vh', overflowY: 'scroll'}}>
          {messages.map(message => (
            <div key={message.id} className={message.sender === 'Me' ? 'sent-message' : 'received-message'}>
              <div>
                {message.sender.charAt(0).toUpperCase()}
              </div>
              <div>
                <p>22222</p>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <Form className="mt-3">
          <Form.Control
            type="textarea"
            placeholder="Type your message..."
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <Button variant="primary" className="mt-2" onClick={handleSendMessage}>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ChatApp;
