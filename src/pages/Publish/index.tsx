import React, { useEffect, useState } from 'react';
import { Button, Carousel, Col, Form, Image, InputGroup, Modal, Row } from 'react-bootstrap';
import './index.module.css'
import { deleteData, initialItem, Item, List, list, save } from "../../api/publish";
import { upload } from "../../api/file";
import NoDataPage from "../../components/NoDataPage";
import styles from "../View/index.module.css";
import UpdateItem from "../../components/PubItem";
import { breedList } from "../../api/view";

const url = process.env.REACT_APP_BASE_URL + "/"
const Update = ({currentItem, setCurrentItem}: { currentItem: Item, setCurrentItem: Function }) => {
  const [imgUrl, setImgUrl] = useState<string>();
  const [breeds, setBreeds] = useState<string[]>([])
  useEffect(() => {
    breed_list()
  }, [])

  const breed_list = async () => {
    const data = await breedList();
    setBreeds(data);
  };
  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const {name, value} = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: value
    });
  };
  useEffect(() => {
    let b = currentItem.breed;
    const breed = currentItem.breed.split(" ");
    if (breed.length > 1) {
      b = breed.reverse().join('/')
    }
    if (currentItem.breed) {
      fetch('https://dog.ceo/api/breed/' + b + '/images/random')
        .then(response => response.json())
        .then(data => setImgUrl(data.message))
        .catch(error => console.error('Error fetching dog image:', error))
    }
  }, [currentItem.breed])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let imageList = []
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      for (let i = 0; i < files.length; i++) {
        const fileVal = await upload(files[i]);
        if (fileVal) {
          imageList.push(fileVal);
        }
      }
    }
    if (imageList.length === 0) {
      return;
    }
    currentItem.image_list = imageList.join(",")
    setCurrentItem({...currentItem})
  };

  return <Form autoComplete="off">
    <Row>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formName" hidden={true}>
          <Form.Control type="text" placeholder="Enter name" value={currentItem.id}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" name="name" value={currentItem.name}
                        onChange={handleInputChange}/>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control as="select" name="gender" onChange={handleInputChange} value={currentItem.gender}>
            <option value="dog">dog</option>
            <option value="bitch">bitch</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formColor">
          <Form.Label>Color</Form.Label>
          <Form.Control type="text" placeholder="Enter Color" name="color" value={currentItem.color}
                        onChange={handleInputChange}/>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formSize">
          <Form.Label>Size</Form.Label>
          <Form.Control as="select" name="size" onChange={handleInputChange} value={currentItem.size}>
            <option value="small">small</option>
            <option value="medium">medium</option>
            <option value="large">large</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formSterilized">
          <Form.Label>Sterilized</Form.Label>
          <Form.Control as="select" name="sterilized" onChange={handleInputChange}
                        value={currentItem.sterilized}>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formVaccinated">
          <Form.Label>Vaccinated</Form.Label>
          <Form.Control as="select" name="vaccinated" onChange={handleInputChange}
                        value={currentItem.vaccinated}>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formBreed">
          <Form.Label>Breed</Form.Label>
          <Form.Control as="select" name="breed" onChange={handleInputChange} value={currentItem.breed}>
            {breeds.map((val, i) => {
              return <option value={val} key={i}>{val}</option>;
            })}
          </Form.Control>
        </Form.Group>
      </Col>
      <Col md={3}>
        <Image src={imgUrl} rounded style={{width: "100%"}} alt={imgUrl}/>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label>Upload Multiple Image</Form.Label>
          <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange}/>
        </Form.Group>
      </Col>
      <Col md={3}>
        <Carousel>
          {currentItem.image_list && currentItem.image_list.split(",").map((item, index) => {
            return <Carousel.Item key={index}>
              <img src={url + item} alt={item} style={{width: "100%", height: "150px"}}/>
            </Carousel.Item>
          })}
        </Carousel>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter description" name="describe"
                        value={currentItem.describe} onChange={handleInputChange}/>
        </Form.Group>
      </Col>
    </Row>
  </Form>
}

const RowComponent = ({
                        items,
                        handleShowModal,
                        handleDelete, searchMore
                      }: { items: List, handleShowModal: Function, handleDelete: Function, searchMore: Function }) => {
  return (<div className={styles.row}>
    <Row>
      {items.list.map((item, i) => (
        <Col key={i} md={4}>
          <div style={{marginTop: '20px'}}>
            <UpdateItem data={item} editEvent={() => {
              handleShowModal(item)
            }} delEvent={handleDelete}/>
          </div>
        </Col>
      ))}
    </Row>
    {items.list.length !== items.count &&
      <div onClick={() => searchMore()} className={styles.more}>
        <Button variant="secondary" type="button">load more</Button>
      </div>}
  </div>)
};
const Publish: React.FC = () => {
  const [items, setItems] = useState<List>({count: 0, list: []});
  const [searchName, setSearchName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentItem, setCurrentItem] = useState<Item>();

  const handleClose = (): void => {
    setShowModal(false);
    setCurrentItem(initialItem);
  };
  useEffect(() => {
    search(currentPage);
  }, [])

  const search = async (page: number) => {
    setCurrentPage(page)
    const data = await list(page, searchName);
    if (data) {
      setItems(data)
    }
    setShowModal(false)
  };
  const handleShowModal = (item: Item): void => {
    setCurrentItem({...item});
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!currentItem) {
      return;
    }
    const data = await save(currentItem);
    if (data) {
      setCurrentPage(1)
      search(1)
    }
  }

  const handleDelete = async (id: number) => {
    await deleteData(id);
    setCurrentPage(1)
    search(1)
  };

  const searchMore = async () => {
    setCurrentPage(currentPage + 1);
    const data = await list(currentPage + 1, searchName);
    if (data) {
      setItems({count: data.count, list: items.list.concat(data.list)})
    }
  };


  return (
    <div className="view mt-3" style={{paddingLeft: "20px"}}>
      <Row className="d-flex justify-content-between align-items-center">
        <Col xs={12} md={6} lg={3} className="mb-3">
          <InputGroup>
            <Form.Control placeholder="Dog name" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
            <Button variant="outline-secondary" id="button-addon2" onClick={() => search(1)}>
              Search
            </Button>
          </InputGroup>
        </Col>
        <Col xs={12} md={6} lg={2} className="text-md-right mb-3">
          <Button onClick={() => handleShowModal(initialItem)}>Add</Button>
        </Col>
      </Row>
      {items.list.length === 0 ?
        <NoDataPage/> :
        <RowComponent items={items} handleShowModal={handleShowModal} handleDelete={handleDelete}
                      searchMore={searchMore}/>
      }
      {showModal &&
        <Modal show={showModal} onHide={handleClose} centered size={"xl"}>
          <Modal.Header closeButton>
            <Modal.Title>{currentItem?.id ? 'Edit' : 'Add'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentItem && <Update currentItem={currentItem} setCurrentItem={setCurrentItem}/>}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleSave}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      }
    </div>
  );

};

export default Publish;
