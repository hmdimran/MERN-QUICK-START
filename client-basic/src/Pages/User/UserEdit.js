/* eslint-disable react/display-name */
import React from 'react';
// import { useParams } from "react-router-dom";
import { Form, Input, Button,PageHeader, Divider } from "antd";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 10,
    },
};

const UserEdit = () => {
    
    return (
        <Form {...layout} name="nest-messages">
            <PageHeader title="Edit User" />
            <Divider />
            <Form.Item
                name={["user", "user-name"]}
                label="User Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={["user", "address"]}
                label="Address"
                rules={[
                    {
                        type: "string",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name={["user", "phone"]}
                label="Contact Number"
                rules={[
                    {
                        type: "string",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={["user", "email"]} label="Email">
                <Input />
            </Form.Item>
            <Form.Item name={["user", "tags"]} label="Tags">
                <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};
export default UserEdit;
