import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, ListGroup, Modal, Row } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import Item, { ItemData } from "../../components/Item";
import Comment, { CommentData } from "../../components/Comment";
import styles from "./index.module.css";
import { addComment, clickData, commentList, list, ListData, moreList } from '../../api/view';

const VirtualList: React.FC = () => {
  const [items, setItems] = useState<ListData>({count: 0, list: []});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItem, setCurrentItem] = useState<ItemData>();
  const [searchName, setSearchName] = useState<string>('');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    search();
  }, [])

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName])

  const search = async () => {
    const data = await list(currentPage, searchName);
    if (data) {
      setItems(data)
    }
  };

  const searchMore = async (page: number) => {
    setCurrentPage(page);
    const data = await moreList(page, searchName);
    if (data) {
      setItems({count: items.count, list: items.list.concat(data)})
    }
  };

  const clickDom = async (dog_id: number) => {
    setShowModal(true)
    items.list.map((item) => {
      if (item.id === dog_id) {
        item.click_num += 1;
        setCurrentItem({...item, click_num: 0, comment_num: 0})
      }
    })
    setItems(items);
    await clickData(dog_id);
    const commentData = await commentList(dog_id)
    if (commentData != null) {
      setComments(commentData);
    }
  };

  const RowComponent: React.FC<{ index: number, style: React.CSSProperties }> = ({index, style}) => (
    <div style={style} className={styles.row}>
      <ListGroup.Item style={{padding: "15px"}} onClick={() => clickDom(items.list[index].id)}>
        <Item data={items.list[index]}/>
      </ListGroup.Item>
      {index == items.list.length - 1 && items.list.length != items.count &&
        <div onClick={() => searchMore(currentPage + 1)} className={styles.more}>
          <Button variant="primary" type="button">load more</Button>
        </div>}
    </div>
  );
  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      comments.unshift({comment: newComment, username: localStorage.getItem("username") || '', insert_time: new Date()})
      setComments(comments);
      items.list.map((item) => {
        if (item.id === currentItem?.id) {
          item.comment_num += 1;
        }
      })
      setItems(items);
      setNewComment('');
      addComment(currentItem?.id || 0, newComment)
    }
  };
  const handleCommentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewComment(e.target.value);
  };

  return (
    <div className={styles.view}>
      <Row className="d-flex justify-content-between align-items-center" style={{paddingLeft: "15px"}}>
        <Col md={3}>
          <InputGroup>
            <Form.Control placeholder="dog name" value={searchName}
                          onChange={(e: { target: { name: string; value: string; }; }) => {
                            setSearchName(e.target.value)
                          }}/>
            <Button variant="outline-secondary" id="button-addon2" onClick={search}>
              search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <List
        height={window.innerHeight - 140}
        itemCount={items.list.length}
        itemSize={180}
        width={'100%'}
      >
        {({index, style}) => <RowComponent index={index} style={style}/>}
      </List>
      <Modal show={showModal} size={"xl"} onHide={() => setShowModal(false)}>
        <div style={{padding: "20px"}}>
          {currentItem && <Item data={currentItem} showNum={false}/>}
          <Form style={{marginTop: "10px"}}>
            <Form.Group controlId="formComment" className="mb-3">
              <Form.Label>leave a comment</Form.Label>
              <Form.Control as="textarea" rows={3} value={newComment} onChange={handleCommentChange}/>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={handleCommentSubmit}>
                submit
              </Button>
            </div>
          </Form>
          <ListGroup>
            {comments.map((comment, index) => (
              <Comment data={comment}/>
            ))}
          </ListGroup>
        </div>
      </Modal>
    </div>
  );
};

export default VirtualList;
