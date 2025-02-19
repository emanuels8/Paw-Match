import { useEffect, useState } from "react";
import { usePostDogsMutation } from "../api/dogsApi";
import { Link, useLocation } from "react-router";
import { FaArrowLeft, FaDog } from "react-icons/fa";
import { Card, Image, Divider } from "antd";
import { CustomText } from "../../../styles/components/CustomText/CustomText";

export const ViewFavoriteDog = () => {
  const location = useLocation();
  const dogMatch = location?.state?.favoriteDog;
  const searchParams = location?.state?.searchParams;

  const [postDogs, { data: postDogData, isSuccess }] = usePostDogsMutation();
  const [favoriteDog, setFavoriteDog] = useState(null);

  useEffect(() => {
    if (dogMatch?.match) {
      postDogs([dogMatch.match]);
    }
  }, [dogMatch?.match, postDogs]);

  useEffect(() => {
    if (isSuccess && postDogData?.length) {
      setFavoriteDog(postDogData[0]);
    }
  }, [isSuccess, postDogData]);

  return (
    <div className="w-100 py-4" style={{ margin: "0 auto" }}>
      <div className="mb-4 w-100">
        <Link
          to="/dogs"
          state={{ searchParams }}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.2rem",
            color: "#5A49A3",
            textDecoration: "none",
          }}
        >
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Search
        </Link>
      </div>

      <Card
        className="shadow-lg w-100 text-center"
        style={{ padding: "0px", borderRadius: "12px" }}
      >
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-center align-items-center w-100">
            <CustomText
              className="me-4"
              fontSize="3rem"
              fontWeight="600"
              color="#5A49A3"
            >
              Your Paw Match!
            </CustomText>

            <CustomText
              className="me-2"
              fontSize="3rem"
              fontWeight="600"
              color="#5A49A3"
            >
              {favoriteDog?.name}
            </CustomText>
            <FaDog fontSize="3rem" color="#5A49A3" />
          </div>
          <Divider />

          <CustomText fontSize="1.5rem" fontWeight="400">
            Learn More about {favoriteDog?.name} below!
          </CustomText>
        </div>

        <div>
          <div>
            <Image
              src={favoriteDog?.img}
              alt={favoriteDog?.name}
              className="rounded"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>

          <Divider />
          <div className="mt-4">
            <CustomText className="me-2" fontSize="1.5rem" fontWeight="500">
              Breed:
            </CustomText>
            <CustomText fontSize="1.5rem" fontWeight="400">
              {favoriteDog?.breed}
            </CustomText>
            <Divider />
            <CustomText className="me-2" fontSize="1.5rem" fontWeight="500">
              Age:
            </CustomText>
            <CustomText fontSize="1.5rem" fontWeight="400">
              {favoriteDog?.age}
            </CustomText>
            <Divider />
            <CustomText className="me-2" fontSize="1.5rem" fontWeight="500">
              Zip Code:
            </CustomText>
            <CustomText fontSize="1.5rem" fontWeight="400">
              {favoriteDog?.zip_code}
            </CustomText>
          </div>
        </div>
      </Card>
    </div>
  );
};
