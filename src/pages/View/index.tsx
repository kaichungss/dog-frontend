import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import Item, { ItemData } from "../../components/Item";
import Comment, { CommentData } from "../../components/Comment";
import styles from "./index.module.css";
import { addComment, clickData, commentList, list, ListData } from '../../api/view';

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
  }, [currentPage])

  const search = async () => {
    const data = await list(currentPage, searchName);
    if (data) {
      setItems({count: data.count, list: items.list.concat(data.list)})
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
      <ListGroup.Item style={{padding: "10px"}} onClick={() => clickDom(items.list[index].id)}>
        <Item data={items.list[index]}/>
      </ListGroup.Item>
      {index == items.list.length - 1 && items.list.length != items.count &&
        <div onClick={() => setCurrentPage(currentPage + 1)} className={styles.more}>load more</div>}
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
      <List
        height={window.innerHeight - 80}
        itemCount={items.list.length}
        itemSize={200}
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
            <Button variant="primary" onClick={handleCommentSubmit}>
              submit
            </Button>
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
