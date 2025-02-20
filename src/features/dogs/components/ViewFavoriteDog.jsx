import { useEffect, useState } from "react";
import { usePostDogsMutation } from "../api/dogs/dogsApi";
import { Link, useLocation } from "react-router";
import { FaArrowLeft, FaDog } from "react-icons/fa";
import { Card, Image, Divider } from "antd";
import { CustomText } from "../../../styles/components/CustomText/CustomText";
import { useLocationsMutation } from "../api/location/locationApi";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const ViewFavoriteDog = () => {
  const location = useLocation();
  const dogMatch = location?.state?.favoriteDog;
  const searchParams = location?.state?.searchParams;

  const [postDogs, { data: postDogData, isSuccess }] = usePostDogsMutation();
  const [locations, { data: locationData, isSuccess: locationIsSuccess }] =
    useLocationsMutation();

  const [favoriteDog, setFavoriteDog] = useState(null);
  const [favoriteDogLocation, setFavoriteDogLocation] = useState(null);

  useEffect(() => {
    if (dogMatch?.match) {
      postDogs([dogMatch.match]);
    }
  }, [dogMatch?.match, postDogs]);

  useEffect(() => {
    if (isSuccess && postDogData?.length) {
      const selectedDog = postDogData[0];
      setFavoriteDog(selectedDog);

      if (selectedDog?.zip_code) {
        locations([selectedDog.zip_code]);
      }
    }
  }, [isSuccess, postDogData, locations]);

  useEffect(() => {
    if (locationIsSuccess && locationData?.length) {
      setFavoriteDogLocation(locationData[0]);
    }
  }, [locationIsSuccess, locationData]);

  return (
    <div className="w-100 py-4">
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
      {locationIsSuccess && (
        <Card
          className="shadow-lg text-center"
          style={{
            padding: "20px",
            borderRadius: "12px",
            backgroundColor: "#F9F9F9",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="text-center">
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <CustomText fontSize="2.5rem" fontWeight="700" color="#5A49A3">
                Your Paw Match!
              </CustomText>
              <CustomText
                fontSize="2.5rem"
                fontWeight="700"
                color="#5A49A3"
                className="ms-2"
              >
                {favoriteDog?.name}
              </CustomText>
              <FaDog fontSize="2.5rem" color="#5A49A3" className="ms-2" />
            </div>
            <Divider />

            <CustomText fontSize="1.4rem" fontWeight="500">
              Learn More about {favoriteDog?.name} below!
            </CustomText>
          </div>
          <div className="mt-3">
            <Image
              src={favoriteDog?.img}
              alt={favoriteDog?.name}
              className="rounded"
              style={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </div>
          <Divider />
          <div className="mt-4 text-left">
            {[
              { label: "Breed", value: favoriteDog?.breed },
              { label: "Age", value: favoriteDog?.age },
              { label: "Zip Code", value: favoriteDog?.zip_code },
              { label: "City", value: favoriteDogLocation?.city },
              { label: "County", value: favoriteDogLocation?.county },
              { label: "State", value: favoriteDogLocation?.state },
            ].map((item, index) => (
              <div
                key={index}
                className="d-flex justify-content-between align-items-center py-2"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "500",
                  borderBottom: index < 5 ? "1px solid #E0E0E0" : "none",
                }}
              >
                <CustomText fontWeight="600" style={{ color: "#5A49A3" }}>
                  {item.label}:
                </CustomText>
                <CustomText fontWeight="500">{item.value}</CustomText>
              </div>
            ))}
          </div>

          {favoriteDogLocation?.latitude && favoriteDogLocation?.longitude && (
            <div className="mt-4">
              <CustomText fontSize="1.5rem" fontWeight="600" color="#5A49A3">
                Location on Map
              </CustomText>
              <MapContainer
                center={[
                  favoriteDogLocation.latitude,
                  favoriteDogLocation.longitude,
                ]}
                zoom={10}
                style={{
                  height: "300px",
                  width: "100%",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {favoriteDogLocation?.latitude &&
                  favoriteDogLocation?.longitude && (
                    <Marker
                      position={[
                        favoriteDogLocation.latitude,
                        favoriteDogLocation.longitude,
                      ]}
                    >
                      <Popup>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CustomText fontSize={"1.25rem"} fontWeight={"600"}>
                            {favoriteDog?.name} is here!{" "}
                          </CustomText>
                          <div className="mb-2">
                            <FaDog
                              fontSize="1.5rem"
                              color="rgba(90, 73, 163)"
                              style={{
                                marginLeft: "8px",
                                position: "relative",
                                top: "2px",
                              }}
                            />
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  )}
              </MapContainer>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
