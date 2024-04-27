import React from "react";
import styles from "./index.module.css";
import { Carousel } from 'react-bootstrap';
import { ItemList } from "../../api/publish";
import edit from "../../assets/edit.png"
import del from "../../assets/del.png"
import fb from "../../assets/fb.png"
import tt from "../../assets/tt.png"


interface Params {
  data: ItemList,
  editEvent: Function
  delEvent: Function
}

const url = process.env.REACT_APP_BASE_URL + "/";
const Edit: React.FC<Params> = ({data, editEvent, delEvent}) => {
  return (<div className={styles.iconItem}>
    <div className={styles.icon}><a href="https://www.facebook.com/sharer/sharer.php" target="_blank"
                                    rel="noreferrer"><img src={fb} alt=""/></a>
    </div>
    <div className={styles.icon}><a href="https://twitter.com/share" target="_blank" rel="noreferrer">
      <img src={tt} alt=""/></a>
    </div>
    <div className={styles.icon} onClick={() => editEvent(data.id)}><img src={edit} alt=""/>
    </div>
    <div className={styles.icon} onClick={() => delEvent(data.id)}><img src={del} alt=""/>
    </div>
  </div>)
}
const UpdateItem: React.FC<Params> = ({data, editEvent, delEvent}) => {
  return (
    <div className={styles.item}>
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
          <div>Update Time：{new Date(data.update_time).toLocaleString()}</div>
        </div>
      </div>
      <Edit data={data} editEvent={editEvent} delEvent={delEvent}/>
    </div>
  );
};

export default UpdateItem;
