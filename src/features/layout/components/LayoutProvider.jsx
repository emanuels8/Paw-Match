import { Header } from "./Header";

export const LayoutProvider = ({ CurrentComponent }) => {
  return (
    <div
      style={{
        padding: "2rem 0px",
        maxWidth: "1440px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Header />
      <div className="d-flex flex-column ">
        {CurrentComponent && CurrentComponent}
      </div>
    </div>
  );
};
