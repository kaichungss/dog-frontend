import React from "react";
import styles from "./index.module.css";
import { Carousel } from 'react-bootstrap';

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
}

const url = process.env.REACT_APP_BASE_URL + "/";
const DetailItem: React.FC<Params> = ({data}) => {
  return (
    <div className={styles.item}>
      <div className={styles.img}>
        <Carousel>
          <Carousel>
            {data.image_list.split(",").map((item, index) => {
              return <Carousel.Item key={index}>
                <img src={url + item} alt={item}/>
              </Carousel.Item>
            })}
          </Carousel>
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
    </div>
  );
};

export default DetailItem;
