import { useAuth } from "../../../app/routes/AuthProvider";
import { useNavigate, useLocation } from "react-router";
import { CustomText } from "../../../styles/components/CustomText/CustomText";
import { useState, useEffect } from "react";
import { Menu } from "antd";
import { FaDog } from "react-icons/fa";

export const Header = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("/dogs");

  const headerStyle = {
    fontSize: "12px",
    height: "60px",
    marginBottom: "20px",
    WebkitTransition: "height 300ms ease",
    transition: "height 300ms ease",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handleClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "/dogs":
        navigate("/dogs");
        break;
      case "logout":
        signOut();
        break;
      default:
    }
  };

  const items = [
    {
      label: (
        <CustomText color="black" fontWeight="500" fontSize="16px">
          Search Dogs
        </CustomText>
      ),
      key: "/dogs",
    },
    {
      label: (
        <CustomText color="black" fontWeight="500" fontSize="16px">
          Logout
        </CustomText>
      ),
      key: "logout",
    },
  ];

  useEffect(() => {
    if (location.pathname) {
      setCurrent(location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="col-12" style={headerStyle}>
      <div className="d-flex flex-row align-items-center">
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

      <Menu
        style={{
          border: "none",
          background: "none",
        }}
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
