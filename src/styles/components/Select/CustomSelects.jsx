import styled from "styled-components";
import { Select } from "antd";
import { fonts, fontSize } from "../../typography/typography";
import { colors } from "../../colors/LightModeColors";

export const CustomSelect = styled(Select).attrs((props) => ({
  background: props.background,
  backgroundColor: props.backgroundColor,
  fontSize: props.fontSize,
  width: props.width,
}))`
  font-size: ${fontSize.body} !important;
  font-family: ${fonts.secondary} !important;
  border: 1px solid ${colors?.disabledGray} !important;
  box-sizing: border-box !important;
  background: transparent;
  min-height: 40px !important;
  width: 100% !important;
  border-radius: 8px !important;

  &.ant-select {
    font-family: ${fonts.secondary} !important;
    padding: 0;
    width: ${(props) => (props.width ? props.width : "100%")};
  }

  &.ant-select .ant-select-selector {
    border: none !important;
    background-color: transparent !important;
    border-radius: 8px !important;
  }

  &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: white !important;
    cursor: pointer;
    background: transparent;
  }

  &.ant-select-status-error {
    border-color: ${colors.errorRed} !important;
  }

  &.ant-select-status-error .ant-select-selector {
    border: none !important;
    background: transparent !important;
  }

  &.ant-select-selection-item {
    border-color: gray;
    background: transparent;
  }

  .ant-select-selection-placeholder {
    display: flex;
    margin-top: 4px;
  }

  .ant-select-selector {
    min-height: 40px !important;
    background: transparent !important;
  }

  &.ant-select-disabled .ant-select-selector {
    color: rgba(0, 0, 0, 0.25);
    background: transparent;
    cursor: not-allowed;
    border: 1px solid ${colors.disabledGray} !important;
  }
`;
