# Prepare The Environment

### Install Dependencies

npm install

### Start The Project

npm start

# Analyze The Structure

### Directory Structure

- api (back end interfaces)
- assets (static)
- components (components)
- pages (page)
- router (routing)
- type (ts type)
- util (tool)

# Component Introduction

### No Resultant Component

This component, named NoDataPage, is a functional React component that renders a message when there is no data
available. It consists of a Container component containing a Row and a Col component from React Bootstrap. Inside the
Col component, there's an Alert component with the variant set to "info" displaying the message "no data yet" within an
Alert.Heading component. This component is designed to inform users when there is no data to display.

```tsx
const NoDataPage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <Alert variant="info">
            <Alert.Heading>no data yet</Alert.Heading>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};
```

### Use Components

```tsx
<NoDataPage/>
```

### List Data Card Component

This component, named Item, is a functional React component that displays information about an item. It takes a prop
named "data", which contains details about the item to be displayed.
Inside the component, it renders the item's images using a Carousel component from React Bootstrap. The images are
retrieved from the "data.image_list" property, which is a comma-separated list of image URLs. Each image is rendered as
a Carousel.Item with an img tag.
Below the images, it displays various details about the item, such as its name, description, gender, color, size,
sterilization status, vaccination status, breed, creator, and creation time. These details are accessed from the "data"
prop.
Lastly, it renders another component named View, passing the item's data and a prop named "favorite" to it. This
component seems to handle user interactions with the item, such as viewing more details or adding it to favorites.

```tsx

interface Params {
  data: ItemData,
  favorite: Function,
  clickP: Function
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
```

### Use Components

```tsx
<Item data={item} favorite={favorite} clickP={clickP}/>
```

# Axios Global Configuration

### Features

- Configured Axios instance with base URL for easy API endpoint management.
- Interceptors for adding authentication token to requests and handling 403 (Forbidden) responses by redirecting to the
  login page.
- Utility functions for making GET, POST, and multipart/form-data upload requests with automatic error handling.

```ts
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Token"] = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response?.status === 403) {
    window.location.href = '/login';
  }
  return {data: {code: 404, msg: error.message, data: null}};
});
const request = async <T>(config: AxiosRequestConfig) => {
  const {data} = await instance.request<Response<T>>(config);
  if (data.code !== 200) {
    alert(data.msg)
    return null;
  }
  return data.data;
};
export const httpPost = async <T>(url: string, data: object) => {
  return request<T>({
    method: 'post',
    url,
    data,
  });
};

```


