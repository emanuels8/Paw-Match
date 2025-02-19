import styled from "styled-components";
import { Button } from "antd";
import { colors } from "../../colors/LightModeColors";
import { fontSize, fontWeight } from "../../typography/typography";

export const CustomButton = styled(Button).attrs((props) => ({
  customtype: props.customtype,
  width: props.width,
  height: props.height,
}))`
  border-radius: 6px;
  height: ${(props) => (props.height ? props.height : "40px")};
  width: ${(props) => (props.width ? props.width : "100%")};
  font-size: ${fontSize.body};
  font-weight: ${fontWeight.bold};
  color: ${colors.wildSand};
  background-color: ${colors?.astronautPurple};
  border: 1px solid ${colors.astronautPurple};
  &.ant-btn:active,
  &.ant-btn:hover,
  &.ant-btn:focus {
    background: ${colors.astronautPurpleHighlight} !important;
  }
`;
