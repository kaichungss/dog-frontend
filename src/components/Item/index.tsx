import React from "react";
import styles from "./index.module.css";
import { Carousel } from 'react-bootstrap';
import com from "../../assets/com.png"
import clickp from "../../assets/cilck.png"
import red from "../../assets/red-heart.png"
import grey from "../../assets/grey-heart.png"

export interface ItemData {
  id: number;
  name: string;
  gender: string;
  color: string;
  size: string;
  sterilized: string;
  vaccinated: string;
  breed: string;
  describe: string;
  image_list: string;
  click_num: number,
  comment_num: number,
  username: string,
  update_time: Date;
  is_collected: number;
}

interface Params {
  data: ItemData,
  favorite: Function,
  clickP: Function
}

const url = process.env.REACT_APP_BASE_URL + "/";
const View: React.FC<{
  data: ItemData,
  favorite: Function,
}> = ({data, favorite}) => {
  return (<div className={styles.iconItem}>
    <div className={styles.icon}>
      <img
        src={data.is_collected ? red : grey}
        onClick={(e) => favorite(e, !data.is_collected, data.id)}
        alt=""
      />
    </div>
    <div className={styles.icon}><img src={com} alt=""/>{data.comment_num}
    </div>
    <div className={styles.icon}><img src={clickp} alt=""/>{data.click_num}
    </div>
  </div>)
}
const Item: React.FC<Params> = ({data, favorite, clickP}) => {
  return (
    <div className={styles.item} onClick={() => clickP(data.id)}>
      <div>
        <Carousel onClick={(e) => e.stopPropagation()}>
          {data.image_list.split(",").map((item, index) => {
            return <Carousel.Item key={index}>
              <img src={url + item} alt={item}/>
            </Carousel.Item>
          })}
        </Carousel>
      </div>
      <div>
        <h2 className={styles.name}>{data.name}</h2>
        <div className={styles.describe}>{data.describe}</div>
        <div className={styles.number}>
          <div>Gender：{data.gender}</div>
          <div>Color：{data.color}</div>
          <div>Size：{data.size}</div>
          <div>Sterilized：{data.sterilized}</div>
          <div>Vaccinated：{data.vaccinated}</div>
          <div>Breed：{data.breed}</div>
          <div>Creator：{data.username}</div>
          <div>Creation Time：{new Date(data.update_time).toLocaleString()}</div>
        </div>
      </div>
      <View data={data} favorite={favorite}/>
    </div>
  );
};

export default Item;
