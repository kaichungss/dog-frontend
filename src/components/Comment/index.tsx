import React from "react";
import styles from "./index.module.css";
import { getTimeAgo } from "../../util/utils";
import { Button } from "react-bootstrap";

export interface CommentData {
  id: number;
  username: string;
  comment: string;
  insert_time: Date;
}


const Comment: React.FC<{ data: CommentData, click: Function }> = ({data, click}) => {
  return (
    <div className={styles.comments}>
      <div className={styles.left}>
        <div className={styles.head}>
          <h5 className={styles.name}>{data.username}</h5>
          <span>{getTimeAgo(new Date(data.insert_time))}</span>
        </div>
        <div className={styles.comment}>{data.comment}</div>
      </div>
      {localStorage.getItem("role") === 'worker' &&
        <div className={styles.right}>
          <Button variant="danger" onClick={() => click(data.id)}>Delete</Button>
        </div>
      }
    </div>
  );
};

export default Comment;
