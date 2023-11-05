import { Upload } from 'antd';
import { Form, Input, Button } from 'antd';
import axios from 'axios';


export default function CouponCreateModal({hideModal}) {

  const onFinish = (values) => {
    console.log('Received values:', values);

    axios.post("/my-coupons/", values, {
      headers:{
        Authorization:`Token ${localStorage.getItem("share-coupon-access-token")}`
      }
    })
    .then((response) => {
      console.log('Coupon created:', response.data);
     
      hideModal()

    })
    .catch((error) => {
      console.error('Error creating coupon:', error);
    });
  };

  return (
    <Form
      name="couponForm"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
      >
        <Upload name="logo" listType="picture">
          <Button>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Category"
        name="category"
      >
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
