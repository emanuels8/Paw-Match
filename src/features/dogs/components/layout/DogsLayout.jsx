import { DogSearch } from "../DogSearch";
import { useState } from "react";
import { useLocation } from "react-router";
import { ListDogs } from "../ListDogs";
import { CustomText } from "../../../../styles/components/CustomText/CustomText";

export const DogsLayout = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState(
    location?.state?.searchParams || null
  );

  return !searchParams ? (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-12 text-center">
        <div className="card p-4 shadow-lg">
          <div className="d-flex align-items-center justify-content-center">
            <CustomText fontWeight={600} fontSize={"2rem"} className="mb-3">
              Find Your Perfect Dog
            </CustomText>
          </div>
          <div>
            <CustomText fontWeight={400} fontSize={"1rem"} className="mb-3">
              Use the filter below to find a list of dogs that match.
            </CustomText>
          </div>
          <DogSearch
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-5 col-sm-12 mb-3">
          <div className="card p-4 shadow-sm">
            <DogSearch
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>

        <div className="col-lg-8 col-md-7 col-sm-12">
          <div className="card p-3 shadow-sm">
            <ListDogs
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
