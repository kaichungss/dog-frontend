import React from "react";
import styles from "./index.module.css";

export interface CommentData {
  username: string;
  comment: string;
  insert_time: Date;
}


const Comment: React.FC<{ data: CommentData }> = ({data}) => {
  return (
    <div className={styles.comments}>
      <div className={styles.head}>
        <h5 className={styles.name}>{data.username}</h5>
        <span>{new Date(data.insert_time).toLocaleString()}</span>
      </div>
      <div className={styles.comment}>{data.comment}</div>
    </div>
  );
};

export default Comment;
