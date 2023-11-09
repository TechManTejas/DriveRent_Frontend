import { Upload } from 'antd';
import { Form, Input, Button } from 'antd';
import axios from 'axios';


export default function CarCreateModal({hideModal}) {

  const onFinish = async (values) => {
    console.log(values)

    const formData = new FormData();

    // Append non-file values to FormData
    Object.keys(values).forEach((key) => {
      if (key !== 'image') {
        formData.append(key, values[key]);
      }
    });

    // Append file data to FormData
    if (values.image && values.image.fileList.length > 0) {
      formData.append('image', values.image.fileList[0].originFileObj);
      console.log(values.image.fileList[0].originFileObj)
    }

    console.log(formData)

    try {
      const response = await axios.post("/my-cars/", formData, {
        headers: {
          Authorization: `Token ${localStorage.getItem("drive-rent-access-token")}`
        },
      });

      console.log('car created:', response.data);
      hideModal();
    } catch (error) {
      console.error('Error creating car:', error);
    }

    hideModal();
  };
  return (
    <Form
      name="carForm"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Company"
        name="company"
        rules={[{ required: true, message: 'Please enter the company name the car belongs!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Image"
        name="image"
        rules={[{ required: true }]}
      >
        <Upload name="logo" listType="picture">
          <Button>Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        label="Number"
        name="number"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Details"
        name="details"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
        <Button htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
