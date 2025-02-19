import styled from "styled-components";
import "./Text.css";

const StyledCustomText = styled.span`
  color: ${(props) => props.color || "inherit"};
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => props.fontSize || "inherit"};
  font-weight: ${(props) => props.fontWeight || "inherit"};
`;

export const CustomText = ({
  className,
  children,
  color,
  fontFamily,
  fontSize,
  fontWeight,
}) => (
  <StyledCustomText
    className={`custom_text ${className || ""}`}
    color={color}
    fontFamily={fontFamily}
    fontSize={fontSize}
    fontWeight={fontWeight}
  >
    {children}
  </StyledCustomText>
);

export const HeaderText = ({ children }) => {
  return <div className="header_text">{children}</div>;
};
