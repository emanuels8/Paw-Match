import { Form } from "antd";
import { useState, useEffect } from "react";
import { useGetDogsQuery } from "../api/dogs/dogsApi";
import { CustomText } from "../../../styles/components/CustomText/CustomText";
import { CustomButton } from "../../../styles/components/Button/CustomButton";
import { CustomSelect } from "../../../styles/components/Select/CustomSelects";
import { CustomNumberInput } from "../../../styles/components/Input/CustomInputs";

export const DogSearch = ({ searchParams, setSearchParams }) => {
  const [form] = Form.useForm();
  const [allDogBreeds, setAllDogBreeds] = useState([]);
  const { data: dogBreeds, isFetching: isBreedsFetching } = useGetDogsQuery({});

  useEffect(() => {
    if (dogBreeds && !isBreedsFetching) {
      setAllDogBreeds(
        dogBreeds.map((breed) => ({ value: breed, label: breed }))
      );
    }
  }, [dogBreeds]);

  useEffect(() => {
    form.setFieldsValue(searchParams);
  }, [searchParams, form]);

  const handleSearch = (values) => {
    if (values.breeds && values.breeds.length === 0) {
      form.setFieldValue(
        "dogBreeds",
        allDogBreeds.map((breed) => breed.value)
      );
    }

    setSearchParams({
      breeds: values.breeds || [],
      zipCodes: values.zipCodes || [],
      ageMin: values.ageMin || "",
      ageMax: values.ageMax || "",
      size: 10,
      from: 0,
      sort: "breed:asc",
    });
  };

  return (
    <Form
      className="d-flex flex-column"
      initialValues={searchParams}
      form={form}
      onFinish={handleSearch}
      layout="vertical"
      style={{ fontSize: "1.1rem" }}
    >
      <Form.Item
        name="breeds"
        label={
          <CustomText fontWeight={500} fontSize={"1rem"}>
            Select Dog Breeds
          </CustomText>
        }
        style={{ fontSize: "1rem", fontWeight: "500" }}
      >
        <CustomSelect
          mode="multiple"
          showSearch
          maxTagCount={4}
          placeholder="Select Dog Breeds"
          optionFilterProp="label"
          loading={isBreedsFetching}
          options={allDogBreeds}
          style={{ fontSize: "1rem" }}
        />
      </Form.Item>
      <Form.Item
        name="zipCodes"
        label={
          <CustomText fontWeight={500} fontSize={"1rem"}>
            Enter Zip Codes
          </CustomText>
        }
        style={{ fontSize: "1rem", fontWeight: "500" }}
        rules={[
          {
            validator: (_, zipCodes) => {
              const isValidZip = (zip) => /^\d{5}$/.test(zip); // US ZIP validation (5-digit)
              const invalidZips =
                zipCodes?.filter((zip) => !isValidZip(zip)) || [];

              return invalidZips.length
                ? Promise.reject(
                    `Invalid ZIP codes: ${invalidZips.join(
                      ", "
                    )}. Please enter valid 5-digit ZIP codes.`
                  )
                : Promise.resolve();
            },
          },
        ]}
      >
        <CustomSelect
          mode="tags"
          showSearch
          placeholder="Enter Zip Codes"
          optionFilterProp="label"
          style={{ fontSize: "1rem" }}
          onBlur={(e) => {
            //removes invalid zipcodes once user clicks away
            const currentValues = e.target.value
              .split(",")
              .map((zip) => zip.trim());
            const isValidZip = (zip) => /^\d{5}$/.test(zip);
            const validZips = currentValues.filter(isValidZip);

            if (validZips.length !== currentValues.length) {
              form.setFieldsValue({ zipCodes: validZips });
            }
          }}
        />
      </Form.Item>

      <Form.Item
        label={
          <CustomText fontWeight={500} fontSize={"1rem"}>
            Age Range
          </CustomText>
        }
        style={{ fontSize: "1rem", fontWeight: "500" }}
      >
        <div className="d-flex flex-row w-100">
          <Form.Item
            className="d-flex w-100"
            name="ageMin"
            rules={[
              { type: "number", min: 0, max: 99, message: "Enter a valid age" },
            ]}
            noStyle
          >
            <CustomNumberInput
              className="d-flex w-100 me-4"
              placeholder="Min Age"
              min={0}
              max={99}
              style={{ fontSize: "1rem" }}
            />
          </Form.Item>
          <Form.Item
            className="d-flex w-100"
            name="ageMax"
            dependencies={["ageMin"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || value > getFieldValue("ageMin")) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Max age must be greater than min age");
                },
              }),
            ]}
            noStyle
          >
            <CustomNumberInput
              className="d-flex w-100"
              placeholder="Max Age"
              min={1}
              max={99}
              style={{ fontSize: "1rem" }}
            />
          </Form.Item>
        </div>
      </Form.Item>
      <Form.Item>
        <CustomButton
          type="primary"
          htmlType="submit"
          style={{ fontSize: "1.2rem" }}
        >
          Search Dogs
        </CustomButton>
      </Form.Item>
    </Form>
  );
};
