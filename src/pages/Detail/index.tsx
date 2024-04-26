import React, { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import Comment, { CommentData } from "../../components/Comment";
import { addComment, commentList, deleteComment, detail } from "../../api/view";
import { useParams } from "react-router-dom";
import { ItemData } from "../../components/Item";
import DetailItem from "../../components/DetailItem";

const DetailPage: React.FC = () => {
  const {id} = useParams();
  const [item, setItem] = useState<ItemData[]>([]);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const handleCommentSubmit = async () => {
    if (newComment.trim() !== '') {
      setNewComment('');
      const data = await addComment(Number(id), newComment);
      if (data) {
        comments.unshift({
          id: data.insertId,
          comment: newComment,
          username: localStorage.getItem("username") || '',
          insert_time: new Date()
        })
        setComments([...comments]);
      }
    }
  };
  useEffect(() => {
    search();
    comment()
  }, [])

  const search = async () => {
    const data = await detail(Number(id));
    if (data && data.length > 0) {
      setItem(data)
    }
  };
  const comment = async () => {
    const commentData = await commentList(Number(id))
    if (commentData != null) {
      setComments(commentData);
    }
  };
  const handleCommentDelete = async (id: number) => {
    await deleteComment(id);
    setComments(comments.filter((item) => {
      return item.id !== id
    }));
  };
  const handleCommentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewComment(e.target.value);
  };

  return (

    <div style={{padding: "20px"}}>
      <Row>
        <Col md={4}>
          {item.map((v, i) => (
            <div style={{marginTop: '20px'}}>
              <DetailItem data={v}/>
            </div>
          ))}
        </Col>
        <Col md={8}>
          <Form style={{marginTop: "10px"}}>
            <Form.Group controlId="formComment" className="mb-3">
              <Form.Label>Leave a comment</Form.Label>
              <Form.Control as="textarea" rows={3} value={newComment} onChange={handleCommentChange}/>
            </Form.Group>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center justify-content-center">
              <Button variant="primary" onClick={handleCommentSubmit}>
                Submit
              </Button>
            </div>
          </Form>
          <ListGroup>
            {comments.map((comment, index) => (
              <Comment data={comment} click={handleCommentDelete} key={index}/>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>

  );
}

export default DetailPage;
