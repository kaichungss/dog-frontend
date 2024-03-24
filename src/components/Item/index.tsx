import React from "react";
import styles from "./index.module.css";

export interface ItemData {
  id: number;
  name: string;
  describe: string;
  image: string;
  click_num: number,
  comment_num: number,
  username: string,
  update_time: Date;
}

interface Params {
  data: ItemData,
  showNum?: boolean
}

const Item: React.FC<Params> = ({data, showNum = true}) => {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <img src={process.env.REACT_APP_BASE_URL + '/' + data.image} alt={data.name}/>
      </div>
      <div className={styles.right}>
        <div>{data.name}</div>
        <div className={styles.describe}>{data.describe}</div>
        <div className={styles.number}>
          <div>uploader：{data.username}</div>
          <div>upload time：{new Date(data.update_time).toLocaleString()}</div>
          {showNum && <div>comments number：{data.comment_num}</div>}
          {showNum && <div>click number：{data.click_num}</div>}
        </div>
      </div>
    </div>
  );
};

export default Item;
