import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, ListGroup, Modal, Row } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import Item, { ItemData } from "../../components/Item";
import Comment, { CommentData } from "../../components/Comment";
import styles from "./index.module.css";
import { addComment, clickData, commentList, deleteComment, ListData } from '../../api/view';
import { addFavorites, list, moreList } from '../../api/favorites';

const VirtualList: React.FC = () => {
  // home data
  const [items, setItems] = useState<ListData>({count: 0, list: []});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItem, setCurrentItem] = useState<ItemData>();
  // search input
  const [searchName, setSearchName] = useState<string>('');
  const [comments, setComments] = useState<CommentData[]>([]);
  // leave a comment
  const [newComment, setNewComment] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  useEffect(() => {
    search();
  }, [])

  const search = async () => {
    setCurrentPage(1);
    const data = await list(1, searchName);
    if (data) {
      setItems(data)
    }
  };

  const searchMore = async () => {
    setCurrentPage(currentPage + 1);
    const data = await moreList(currentPage + 1, searchName);
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
      return item;
    })
    setItems(items);
    await clickData(dog_id);
    const commentData = await commentList(dog_id)
    if (commentData != null) {
      setComments(commentData);
    }
  };
  const favorite = async (e: FormEvent, f: boolean, dog_id: number) => {
    e.stopPropagation();
    setShowModal(false)
    await addFavorites(f, dog_id);
    await search();
  }

  const RowComponent: React.FC<{ index: number, style: React.CSSProperties }> = ({index, style}) => (
    <div style={style} className={styles.row}>
      <ListGroup.Item style={{padding: "15px"}} onClick={() => clickDom(items.list[index].id)} key={index}>
        <Item data={items.list[index]} click={favorite}/>
      </ListGroup.Item>
      {index === items.list.length - 1 && items.list.length !== items.count &&
        <div onClick={() => searchMore()} className={styles.more}>
          <Button variant="secondary" type="button">load more</Button>
        </div>}
    </div>
  );
  const handleCommentSubmit = async () => {
    if (newComment.trim() !== '') {
      items.list.map((item) => {
        if (item.id === currentItem?.id) {
          item.comment_num += 1;
        }
        return item;
      })
      setItems(items);
      setNewComment('');
      const data = await addComment(currentItem?.id || 0, newComment);
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

  const handleCommentDelete = async (id: number) => {
    items.list.map((item) => {
      if (item.id === currentItem?.id) {
        item.comment_num -= 1;
      }
      return item;
    })
    setItems(items);
    await deleteComment(id);
    setComments(comments.filter((item) => {
      return item.id !== id
    }));
  };
  const handleCommentChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setNewComment(e.target.value);
  };
  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      search()
    }
  };
  return (
    <div className={styles.view}>
      <Row className="d-flex justify-content-between align-items-center" style={{paddingLeft: "15px", height: "50px"}}>
        <Col md={3}>
          <InputGroup>
            <Form.Control placeholder="dog name" value={searchName}
                          onKeyDown={handleKeyDown}
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
        height={window.innerHeight - 150}
        itemCount={items.list.length}
        itemSize={180}
        width={'100%'}
      >
        {({index, style}) => <RowComponent index={index} style={style}/>}
      </List>
      <Modal show={showModal} size={"xl"} onHide={() => setShowModal(false)}>
        <div style={{padding: "20px"}}>
          {currentItem && <Item data={currentItem} showNum={false} click={favorite}/>}
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
              <Comment data={comment} click={handleCommentDelete} key={index}/>
            ))}
          </ListGroup>
        </div>
      </Modal>
    </div>
  );
};

export default VirtualList;
