import { useEffect, useState } from "react";
import { Card, Image, notification, Pagination, Spin } from "antd";
import {
  useDogsMatchMutation,
  usePostDogsMutation,
  useSearchDogsQuery,
} from "../api/dogs/dogsApi";
import { CustomButton } from "../../../styles/components/Button/CustomButton";

import dogNotFound from "../../../assets/dogs/dogNotFound.png";
import { FaArrowUp, FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { CustomText } from "../../../styles/components/CustomText/CustomText";

export const ListDogs = ({
  setShowFavoriteDog,
  searchParams,
  setSearchParams,
}) => {
  const [currentDogs, setCurrentDogs] = useState([]);
  const [favoriteDogs, setFavoriteDogs] = useState([]);
  const { data: dogSearchResults, isFetching: isSearchFetching } =
    useSearchDogsQuery(searchParams, { skip: !searchParams });
  const [postDogs, { data: postDogData }] = usePostDogsMutation();
  const [dogsMatch, { data: dogsMatchData }] = useDogsMatchMutation();
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    if (dogSearchResults?.resultIds?.length > 0 && !isSearchFetching) {
      postDogs(dogSearchResults.resultIds);
    } else if (dogSearchResults?.resultIds?.length === 0) {
      setSearchParams({
        breeds: [],
        zipCodes: [],
        ageMin: "",
        ageMax: "",
        size: 10,
        from: 0,
        sort: "breed:asc",
      });
      notification.warning({ message: "No dogs with this criteria!" });
    }
  }, [dogSearchResults, postDogs]);

  useEffect(() => {
    if (postDogData) {
      setCurrentDogs(postDogData);
    }
  }, [postDogData]);

  useEffect(() => {
    if (dogsMatchData) {
      setShowFavoriteDog(dogsMatchData);
    }
  }, [dogsMatchData]);

  useEffect(() => {
    if (searchParams) {
      setIsAscending(searchParams?.sort === "breed:asc");
    }
  }, [searchParams]);

  const handlePaginationChange = (page, newSize) => {
    const size = newSize || searchParams?.size || 10;
    const newFrom = (page - 1) * size;

    setSearchParams({ ...searchParams, from: newFrom, size });
    window.scrollTo(0, 0);
  };

  const sortListAscDesc = () => {
    setSearchParams((prevSearchParams) => {
      const newSort =
        prevSearchParams?.sort === "breed:asc" ? "breed:desc" : "breed:asc";
      return { ...prevSearchParams, sort: newSort, from: 0 };
    });
  };

  const handleFavoriteDogs = (selectedDog) => {
    setFavoriteDogs((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.includes(selectedDog.id);
      return isAlreadyFavorite
        ? prevFavorites.filter((id) => id !== selectedDog.id)
        : [...prevFavorites, selectedDog.id];
    });
  };

  const findDogMatch = () => {
    dogsMatch(favoriteDogs);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center my-3">
        <div>
          <CustomText fontWeight={"700"} fontSize={"24px"} className="mb-0">
            Paw Matches
          </CustomText>
        </div>
        <div className="d-flex">
          <CustomButton type="primary" onClick={sortListAscDesc}>
            {isAscending ? <FaSortAlphaDown /> : <FaSortAlphaUp />} Sort by
            Breed
          </CustomButton>
        </div>
      </div>

      <div className="row">
        {currentDogs?.length > 0
          ? currentDogs.map((dog) => {
              const isFavorite = favoriteDogs.includes(dog.id);
              return (
                <div
                  key={dog.id}
                  className="col-lg-6 col-md-6 col-sm-12 mb-4 d-flex"
                >
                  <Card
                    className="shadow-sm w-100 d-flex flex-column"
                    cover={
                      <Image
                        src={dog?.img || dogNotFound}
                        alt={dog?.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    }
                    actions={[
                      <CustomButton
                        type="primary"
                        onClick={() => handleFavoriteDogs(dog)}
                        style={{ fontSize: "1.2rem" }}
                      >
                        {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                      </CustomButton>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <CustomText fontWeight={"700"}>{dog?.name}</CustomText>
                      }
                      description={
                        <>
                          <div className="mb-2">
                            <CustomText>
                              <CustomText fontWeight={"600"}>Breed:</CustomText>{" "}
                              {dog?.breed}
                            </CustomText>
                          </div>

                          <div className="mb-2">
                            <CustomText>
                              <CustomText fontWeight={"600"}>Age:</CustomText>{" "}
                              {dog?.age}
                            </CustomText>
                          </div>
                          <div className="mb-2">
                            <CustomText>
                              <CustomText fontWeight={"600"}>
                                Zip Code:
                              </CustomText>{" "}
                              {dog?.zip_code}
                            </CustomText>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </div>
              );
            })
          : [...Array(9)].map((_, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-6 col-sm-12 mb-4 d-flex"
              >
                <Spin
                  className="d-flex flex-row justify-content-center"
                  spinning={isSearchFetching}
                >
                  <Card
                    className="shadow-sm w-100 d-flex flex-column align-items-center justify-content-center"
                    cover={
                      <Image
                        src={dogNotFound}
                        alt="Dog Not Found"
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    }
                  >
                    <h6 className="fw-bold mt-3">No Dogs Found</h6>
                    <p className="text-muted">
                      Try adjusting your search filters.
                    </p>
                  </Card>
                </Spin>
              </div>
            ))}
      </div>

      <div className="d-flex justify-content-center my-4">
        <Pagination
          current={
            Math.floor((searchParams?.from || 0) / (searchParams?.size || 10)) +
            1
          }
          pageSize={searchParams?.size || 10}
          total={dogSearchResults?.total || 0}
          onChange={handlePaginationChange}
          showSizeChanger={true}
          pageSizeOptions={["10", "25", "50", "100"]}
        />
      </div>
      <div className="d-flex flex-row justify-content-between w-100">
        <div className="d-flex justify-content-center w-75 mb-4 me-4">
          <CustomButton
            disabled={favoriteDogs?.length <= 0}
            type="primary"
            onClick={findDogMatch}
          >
            Find Dog Match
          </CustomButton>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <CustomButton type="primary" onClick={() => window.scrollTo(0, 0)}>
            <FaArrowUp />
            Back to top
          </CustomButton>
        </div>
      </div>
    </div>
  );
};
