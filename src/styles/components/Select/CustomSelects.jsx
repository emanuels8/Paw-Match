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

  &.ant-select {
    font-family: ${fonts.secondary} !important;
    border-radius: 8px !important;
    padding: 0;
    width: ${(props) => (props.width ? props.width : "100%")};
    select::-ms-value {
      border: none;
    }
  }
  .ant-select-selector .ant-select-selection-placeholder {
    display: flex;
    margin-top: 4px;
  }
  &.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
    background-color: transparent;
    transition: none;
    border-radius: 8px;
    font-family: ${fonts.secondary} !important;
    background: transparent;
  }

  &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: white;
    border-right-width: none;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: transparent;
  }

  .ant-select-selection-item-content {
    display: inline-block;
    margin-right: 4px;
    overflow: hidden;
    white-space: pre;
    text-overflow: ellipsis;
    background: transparent;
  }

  .ant-select-selection-overflow {
    position: relative;
    display: flex;
    flex: auto;
    flex-wrap: wrap;
    background: transparent;
  }

  .ant-select.ant-select-in-form-item {
    background: transparent;
  }

  .ant-select-selection-item {
    border-color: gray;
    background: transparent;
  }

  .ant-select-selector {
    background: transparent;
  }

  &.ant-select-disabled .ant-select-selector {
    color: rgba(0, 0, 0, 0.25);
    background: transparent;
    cursor: not-allowed;
    border: 1px solid ${colors.disabledGray} !important;
  }

  &.ant-select-multiple.ant-select-disabled .ant-select-selector {
    background: transparent !important;
    cursor: not-allowed;
  }

  &.ant-select-status-error.ant-select:not(.ant-select-disabled):not(
      .ant-select-customize-input
    ):not(.ant-pagination-size-changer)
    .ant-select-selector {
    cursor: not-allowed;
    background-color: transparent !important;
    border: 1px solid ${colors?.disabledGray} !important;
  }
`;
