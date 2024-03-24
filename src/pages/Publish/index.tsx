import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Pagination, Row, Table } from 'react-bootstrap';
import './index.module.css'
import { deleteData, initialItem, Item, ITEMS_PER_PAGE, List, list, save } from "../../api/publish";
import { upload } from "../../api/file";

const Publish: React.FC = () => {
  const [items, setItems] = useState<List>({count: 0, list: []});
  const [searchName, setSearchName] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item>(initialItem);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleClose = (): void => {
    setShowModal(false);
    setCurrentItem(initialItem);
  };
  useEffect(() => {
    search();
  }, [currentPage])

  const search = async () => {
    const data = await list(currentPage, searchName);
    if (data) {
      setItems(data)
    }
  };
  const handleShowModal = (item: Item): void => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
    const {name, value} = e.target;
    setCurrentItem({
      ...currentItem,
      [name]: value
    });
  };

  const handleSave = async () => {
    const data = await save(currentItem);
    if (data) {
      window.location.reload();
    }
  }

  const handleDelete = async (id: number) => {
    await deleteData(id);
    window.location.reload();
  };
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const fileVal = await upload(file);
      if (fileVal) {
        currentItem.image = fileVal;
        setCurrentItem(currentItem)
      }
    }
  };

  return (
    <div className="view container mt-3">
      <Row className="d-flex justify-content-between align-items-center">
        <Col md={3} className="mb-3">
          <InputGroup>
            <Form.Control placeholder="dog name" value={searchName}
                          onChange={(e: { target: { name: string; value: string; }; }) => {
                            setSearchName(e.target.value)
                          }}/>
            <Button variant="outline-secondary" id="button-addon2" onClick={search}>
              search
            </Button>
          </InputGroup>
        </Col>
        <Col md={2} className="text-right">
          <Button onClick={() => handleShowModal(initialItem)}>Add</Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Name</th>
          <th>Describe</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {items.list.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.describe}</td>
            <td><img src={process.env.REACT_APP_BASE_URL+'/' + item.image} alt={item.name} style={{width: "40px"}}/></td>
            <td>
              <Button variant="primary" onClick={() => handleShowModal(item)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>

      <Pagination>
        {Array.from({length: Math.ceil(items.count / ITEMS_PER_PAGE)}).map((_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem.id ? 'Edit' : 'Add'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form autoComplete="off">
            <Form.Group className="mb-3" controlId="formName" hidden={true}>
              <Form.Control type="text" placeholder="Enter name" value={currentItem.id}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name="name"
                            value={currentItem.name} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>describe</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter describe" name="describe"
                            value={currentItem.describe} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Default file input example</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Publish;
