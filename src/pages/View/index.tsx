import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FixedSizeList as List } from 'react-window';
import styles from "./index.module.css";
import { httpPost } from "../../api/request";

interface ItemList {
  id: number;
  name: string;
  describe: string;
  image: string;
  update_time: Date;
}

interface ListData {
  count: number;
  list: ItemList[];
}

const ITEMS_PER_PAGE = 20;
const VirtualList: React.FC = () => {
  const [items, setItems] = useState<ListData>({count: 0, list: []});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchName, setSearchName] = useState<string>('');

  useEffect(() => {
    search();
  }, [currentPage])

  const search = async () => {
    const data = await httpPost<ListData>("/system/list", {currentPage, limit: ITEMS_PER_PAGE, name: searchName});
    if (data != null) {
      setItems(data)
    }
  };

  const clickDom = async (dog_id: number) => {
    const data = await httpPost("/system/click", {dog_id});
    if (data != null) {

    }
  };



  const RowComponent: React.FC<{ index: number, style: React.CSSProperties }> = ({index, style}) => (
    <div style={style}>
      <ListGroup.Item style={{padding: "10px"}}>
        <div className={styles.item}>
          <div className={styles.left}>
            <img src={items.list[index].image} alt={items.list[index].name}/>
          </div>
          <div className={styles.right}>
            <div>{items.list[index].name}</div>
            <div>{items.list[index].describe}</div>
            <div className={styles.number}>
              <div>uploader：tony</div>
              <>uploadTime：{new Date(items.list[index].update_time).toLocaleString()}</>
              <div>comments number：1111</div>
              <div onClick={() => clickDom(items.list[index].id)}>click number: 50</div>
            </div>
          </div>
        </div>
      </ListGroup.Item>
    </div>
  );

  return (
    <List
      height={window.innerHeight}
      itemCount={items.count}
      itemSize={200}
      width={'100%'}
      style={{backgroundColor: "#f8f8f8", padding: "10px", height: "20%"}}
    >
      {({index, style}) => <RowComponent index={index} style={style}/>}
    </List>
  );
};

export default VirtualList;
