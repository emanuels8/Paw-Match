import React from "react";
import { Form } from "antd";
import { useAuth } from "../AuthProvider";
import { CustomInput } from "../../../styles/components/Input/CustomInputs";
import { FaDog } from "react-icons/fa";
import { CustomText } from "../../../styles/components/CustomText/CustomText";
import { CustomButton } from "../../../styles/components/Button/CustomButton";

export const Login = () => {
  const { signIn } = useAuth();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  return (
    <div
      style={{
        padding: "2rem 0px",
        maxWidth: "1440px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{ cursor: "pointer" }}
        className="d-flex flex-row align-items-center"
        onClick={() => {
          window.location.reload();
        }}
      >
        <CustomText
          className="me-3"
          fontSize="2.25rem"
          fontWeight="800"
          color="rgba(90, 73, 163)"
        >
          Paw Match
        </CustomText>
        <FaDog fontSize="2.25rem" color="rgba(90, 73, 163)" />
      </div>
      <div className="d-flex flex-column mt-5">
        <Form
          layout="vertical"
          onFinish={signIn}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <CustomInput />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <CustomInput />
          </Form.Item>

          <Form.Item>
            <CustomButton type="primary" htmlType="submit">
              Submit
            </CustomButton>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
