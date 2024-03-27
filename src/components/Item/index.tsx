import React from "react";
import styles from "./index.module.css";

export interface ItemData {
  id: number;
  name: string;
  breed: string;
  describe: string;
  image: string;
  click_num: number,
  comment_num: number,
  username: string,
  update_time: Date;
  is_collected: number;
}

interface Params {
  data: ItemData,
  showNum?: boolean,
  click: Function
}

const Item: React.FC<Params> = ({data, showNum = true, click}) => {
  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <img src={process.env.REACT_APP_BASE_URL + '/' + data.image} alt={data.name}/>
      </div>
      <div className={styles.right}>
        <div>{data.name}</div>
        <div className={styles.describe}>{data.describe}</div>
        <div className={styles.number}>
          <div>breed：{data.breed}</div>
          <div>uploader：{data.username}</div>
          <div>time：{new Date(data.update_time).toLocaleString()}</div>
          {showNum && <div>comments number：{data.comment_num}</div>}
          {showNum && <div>click number：{data.click_num}</div>}
        </div>
      </div>
      <div className={styles.r}>
        {!data.is_collected ?
          (<div className={styles.right}>
            <div className={styles.no_heart} onClick={(e) => click(e, true, data.id)}></div>
          </div>) : <div className={styles.right}>
            <div className={styles.heart} onClick={(e) => click(e, false, data.id)}></div>
          </div>
        }
      </div>
    </div>
  );
};

export default Item;
