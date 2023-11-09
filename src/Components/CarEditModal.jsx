import { Form, Input, Upload, Button, Switch } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';


export default function CarEditModal({ hideModal, carId }) {

    const [form] = Form.useForm();
    const [carData, setcarData] = useState({});

    useEffect(() => {
        // Fetch car details based on carId using Axios
        axios.get(`/my-cars/${carId}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem("drive-rent-access-token")}`,
            },
        })
            .then((response) => {
                setcarData(response.data);
                form.setFieldsValue(response.data);
                console.log(carData)
            })
            .catch((error) => {
                console.error('Error fetching car details:', error);
            });
    }, [carId, form]);

    const onFinish = (values) => {
        values.status = values.status === false ? "Closed" : "Active"

        console.log('Updated values:', values);

        axios.patch(`/my-cars/${carId}/`, values, {
            headers: {
                Authorization: `Token ${localStorage.getItem("drive-rent-access-token")}`,
            },
        })
            .then((response) => {
                console.log('car updated:', response.data);
                hideModal();
            })
            .catch((error) => {
                console.error('Error updating car:', error);
            });
    };

    return (
        <Form
          form={form}
          name="carForm"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please enter the title!' }]
            }
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
    
          <Form.Item
            label="Status"
            name="status"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Closed" />
          </Form.Item>
    
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      );
}
