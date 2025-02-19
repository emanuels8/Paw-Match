import styled from "styled-components";
import { Input, InputNumber } from "antd";
import { fonts, fontSize } from "../../typography/typography";

export const CustomInput = styled(Input).attrs((props) => ({
  width: props.width,
}))`
  border: 1px solid ${"grey"} !important;
  font-size: ${fontSize.body} !important;
  font-family: ${fonts.secondary} !important;
  width: ${(props) => (props.width ? props.width : "100%")} !important;
  border-radius: 6px;
  padding: 5px 10px;
  background-color: transparent !important;
  height: 40px !important;
`;

export const CustomNumberInput = styled(InputNumber).attrs((props) => ({
  width: props.width,
}))`
  border: 1px solid grey !important;
  font-size: ${fontSize.body} !important;
  width: ${(props) => (props.width ? props.width : "100%")} !important;
  border-radius: 6px;
  padding: 5px 10px;
  background-color: transparent !important;
  height: 40px !important;
  font-family: ${fonts.secondary} !important;
  display: flex;
  align-items: center;

  .ant-input-number-input-wrap {
    flex-grow: 1;
    width: 100%;
  }
`;
