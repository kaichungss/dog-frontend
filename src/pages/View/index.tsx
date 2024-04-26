import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Row } from 'react-bootstrap';
import Item from "../../components/Item";
import styles from "./index.module.css";
import { clickData, list, ListData, moreList } from '../../api/view';
import { addFavorites } from '../../api/favorites';
import NoDataPage from "../../components/NoDataPage";

const RowComponent = ({
                        items,
                        favorite,
                        clickP, searchMore
                      }: { items: ListData, favorite: Function, clickP: Function, searchMore: Function }) => (
  <div className={styles.row}>
    <Row>
      {items.list.map((item, i) => (
        <Col key={i} md={4}>
          <div style={{marginTop: '20px'}}>
            <Item data={item} favorite={favorite} clickP={clickP}/>
          </div>
        </Col>
      ))}
    </Row>
    {items.list.length !== items.count &&
      <div onClick={() => searchMore()} className={styles.more}>
        <Button variant="secondary" type="button">load more</Button>
      </div>}
  </div>
);
const VirtualList: React.FC = () => {
  const [items, setItems] = useState<ListData>({count: 0, list: []});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchName, setSearchName] = useState<string>('');
  const [breed, setBreed] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);

  useEffect(() => {
    search();
  }, [])

  const search = async () => {
    setCurrentPage(1);
    const data = await list(1, searchName, size, breed);
    if (data) {
      setItems(data)
    }
  };

  const searchMore = async () => {
    setCurrentPage(currentPage + 1);
    const data = await moreList(currentPage + 1, searchName, size, breed);
    if (data) {
      setItems({count: items.count, list: items.list.concat(data)})
    }
  };

  const clickP = async (dog_id: number) => {
    items.list.map((item) => {
      if (item.id === dog_id) {
        item.click_num += 1;
      }
      return item;
    })
    setItems(items);
    await clickData(dog_id);
    window.open('/system/detail/' + dog_id, '_blank');
  };


  const favorite = async (e: FormEvent, f: boolean, dog_id: number) => {
    e.stopPropagation();
    items.list.map((item) => {
      if (item.id === dog_id) {
        if (f) {
          item.is_collected = 1;
        } else {
          item.is_collected = 0;
        }
      }
      return item;
    })
    setItems({...items});
    await addFavorites(f, dog_id);
  }

  const sizeDropdownChange = (event: { target: { value: any; checked: any; }; }) => {
    const {value, checked} = event.target;
    if (checked) {
      setSize([value]);
    } else {
      setSize(size.filter((option) => option !== value));
    }
  };
  const breedDropdownChange = (event: { target: { value: any; checked: any; }; }) => {
    const {value, checked} = event.target;
    if (checked) {
      setBreed([value]);
    } else {
      setBreed(breed.filter((option) => option !== value));
    }
  };
  return (
    <div className={styles.view}>
      <Row >
        <Col md={3}>
          <Form.Control placeholder="dog name" value={searchName}
                        onChange={(e: { target: { name: string; value: string; }; }) => {
                          setSearchName(e.target.value)
                        }}/>
        </Col>
        <Col md={4} className="d-flex justify-content-around align-items-center">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select Size
            </Dropdown.Toggle>
            <Dropdown.Menu style={{maxHeight: '200px', overflowY: 'auto'}}>
              <Form>
                {['small', 'medium', 'large'].map((option) => (
                  <Form.Check
                    key={option}
                    type="checkbox"
                    label={option}
                    value={option}
                    onChange={sizeDropdownChange}
                  />
                ))}
              </Form>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Select Breed
            </Dropdown.Toggle>
            <Dropdown.Menu style={{maxHeight: '200px', overflowY: 'auto'}}>
              <Form>
                {[
                  "affenpinscher",
                  "african",
                  "airedale",
                  "akita",
                  "appenzeller",
                  "australian-shepherd",
                  "basenji",
                  "beagle",
                  "bluetick",
                  "borzoi",
                  "bouvier",
                  "boxer",
                  "brabancon",
                  "briard",
                  "buhund-norwegian",
                  "bulldog-boston",
                  "bulldog-english",
                  "bulldog-french",
                  "bullterrier-staffordshire",
                  "cattledog-australian",
                  "chihuahua"
                ].map((option) => (
                  <Form.Check
                    key={option}
                    type="checkbox"
                    label={option}
                    value={option}
                    onChange={breedDropdownChange}
                  />
                ))}
              </Form>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
          <Button variant="outline-secondary" id="button-addon2" onClick={search}>
            search
          </Button>
        </Col>
      </Row>
      {items.list.length === 0 ?
        <NoDataPage/> :
        <RowComponent items={items} favorite={favorite} clickP={clickP} searchMore={searchMore}/>
      }
    </div>
  );
};

export default VirtualList;
