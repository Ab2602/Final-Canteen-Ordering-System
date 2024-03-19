import { Box } from "@mui/material";
// import { Formik } from "formik";
import * as yup from "yup";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";


import { debounce, lowerCase } from "lodash";
import React, { useState } from "react";

import useRequireAuth from "../useRequireAuth";

import {
  Button,
  //   Cascader,
  Checkbox,
  //   ColorPicker,
  DatePicker,
  Form,
  Input,
  //   InputNumber,
  Radio,
  AutoComplete,
  //   Select,
  //   Slider,
  //   Switch,
  //   TreeSelect,
  Upload,
  notification
} from "antd";

const AddItem = () => {
  useRequireAuth("/");
  // const isNonMobile = useMediaQuery("(min-width:600px)");

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };

  const [loading, setLoading] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);

  const debouncedSearch = debounce(async (searchText) => {
    if (searchText) {
      try {
        const response = await fetch("http://localhost:5000/admin/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchText }),
        });
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setOptions([]);
    }
  }, 300);

  const handleSearch = (value) => {
    debouncedSearch(value);
  };

  const onSelect = (value, option) => {
    const {
      item_id,
      name,
      price,
      description,
      image,
      type_for_item,
      item_status,
    } = JSON.parse(value);
    form.setFieldsValue({
      item_id,
      name,
      price,
      image,
      description,
      type_for_item,
      item_status,
      search: `${name} - ${description}`,
    });
    // setComponentDisabled(true);
  };


  return (
    <Box m="20px">
      <Header title="ADD ITEM" subtitle="Add a new item" />
      <div>
          <Checkbox
            checked={componentDisabled}
            onChange={(e) => setComponentDisabled(e.target.checked)}
          >
            Form disabled
          </Checkbox>
          <Form
            form={form}
            labelCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 6,
              },
            }}
            wrapperCol={{
              xs: {
                span: 24,
              },
              sm: {
                span: 14,
              },
            }}
            layout="horizontal"
            disabled={componentDisabled}
            style={{
              maxWidth: 600,
            }}
            onFinish={async (values) => {
              try {
                const location1 = localStorage.getItem("location");
                const location = lowerCase(location1);
                const {
                  item_id,
                  name,
                  price,
                  description,
                  image,
                  type_for_item,
                  item_status,
                } = values;
                console.log("price: ", price);
                const response = await fetch("http://localhost:5000/admin/additem", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    item_id,
                    name,
                    price,
                    description,
                    image,
                    type_for_item,
                    item_status,
                    location,
                  }),
                });
                if (response.ok) {
                  console.log("Item Added successfully");
                  const { message } = await response.json();
                  // alert(message);
                  notification.success({
                    message: message,
                    // description: 'Item added successfully.',
                    duration: 2
                  });
            
                  form.resetFields();
                } else {
                  const errorData = await response.json();
                  // console.error('Error during login:', errorData.message);
                  // alert(errorData.message);
                  notification.error({
                    message: errorData.message,
                    description: 'An error occurred during adding item',
                    duration: 2,
                  });
                }
              } catch (error) {
                console.error("Error during adding item:", error);
                // alert("An error occurred during adding item");
                notification.error({
                  message: 'Error',
                  description: 'An error occurred during adding item',
                  duration: 2,
                });
              }
            }}
          >
            <Form.Item
              label="Search"
              name="search"
            >
              <AutoComplete
                placeholder="search here"
                onSearch={handleSearch}
                onSelect={onSelect}
                options={options.map((option) => ({
                  value: JSON.stringify(option),
                  label: `${option.name} - ${option.description}`,
                }))}
              />
            </Form.Item>
            <Form.Item
              label="Item ID"
              name="item_id"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input placeholder="Item ID" />
            </Form.Item>
            <Form.Item
              label="Item Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input placeholder="Item Name" />
            </Form.Item>
            <Form.Item
              label="Price ( Rs. )"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input placeholder="Price" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input placeholder="Description" />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Input placeholder="Image Url" />
            </Form.Item>

            {/* <Form.Item
      label="Image"
      name="image"
      rules={[
        {
          required: true,
          message: 'Please input!',
        },
      ]}
    >
      <Input placeholder="Image"/>
    </Form.Item> */}
            <Form.Item
              label="Type"
              name="type_for_item"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="snacks"> snacks </Radio>
                <Radio value="hot snacks">Hot Snacks</Radio>
                <Radio value="beverages">Beverages</Radio>
                <Radio value="chocolate">Chocolates</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Status"
              name="item_status"
              rules={[
                {
                  required: true,
                  message: "Please input!",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="active"> Active </Radio>
                <Radio value="inactive"> Inactive </Radio>
              </Radio.Group>
            </Form.Item>
            {/* <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              {
                title: 'Light',
                value: 'light',
                children: [
                  {
                    title: 'Bamboo',
                    value: 'bamboo',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item> */}
            {/* <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item> */}
            {/* <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item> */}
            {/* <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item> */}
            {/* <Form.Item label="Slider">
          <Slider />
        </Form.Item>
        <Form.Item label="ColorPicker">
          <ColorPicker />
        </Form.Item> */}
            {/* <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile} name="image">
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{
                border: 0,
                background: 'none',
              }}
              type="button"
            >
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </button>
          </Upload>
        </Form.Item> */}
            <Form.Item
              wrapperCol={{
                offset: 9,
                span: 16,
              }}
            >
              <Button className="bg-blue-600" style={{backgroundColor:'#630944'}} type="primary" htmlType="submit">
                Add Item
              </Button>
            </Form.Item>
          </Form>
        </div>
    </Box>
  );
};

// const phoneRegExp =
//   /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// const checkoutSchema = yup.object().shape({
//   firstName: yup.string().required("required"),
//   lastName: yup.string().required("required"),
//   email: yup.string().email("invalid email").required("required"),
//   contact: yup
//     .string()
//     .matches(phoneRegExp, "Phone number is not valid")
//     .required("required"),
//   address1: yup.string().required("required"),
//   address2: yup.string().required("required"),
// });
// const initialValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   contact: "",
//   address1: "",
//   address2: "",
// };

export default AddItem;
