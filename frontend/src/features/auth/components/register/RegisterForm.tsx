import React, { useEffect, useMemo, useState } from "react";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import MUICheckbox from "../../../../common/components/form/MUICheckbox";
import { getIsUserCreated } from "../../selectors/AuthSelector";
import { useDispatch, useSelector } from "react-redux";
import { UserCredentials, UserRole } from "../../types/type";
import { useGetCountriesQuery } from "../../../../services/coutriesApi";
import { registerUser } from "../../thunks/AuthThunk";
import MUIInput from "../../../../common/components/form/MUIInput";
import MUIAutocomplete from "../../../../common/components/form/MUIAutocomplete";
import ReCAPTCHACheckBox from "../../../../common/components/ReCAPTCHACheckBox";

const FormContainer = styled.div`
  padding: 2rem;
  text-align: center;
  max-width: 670px;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
`;

const SubmitButton = styled(Button)`
  background-color: #d32f2f;
  &:hover {
    background-color: #b71c1c;
  }
  margin-bottom: 16px;
`;

const RecaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserCredentials>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUserCreated = useSelector(getIsUserCreated);
  const { data: countries } = useGetCountriesQuery({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isUserCreated) {
      navigate("/MotorcycleXpert/otp-login");
    }
  }, [isUserCreated]);
  const filteredCountries = useMemo(
    () =>
      countries
        ?.filter((country: string) => {
          if (searchTerm) {
            country.toLowerCase().includes(searchTerm);
          }
          return true;
        })
        .map((country: string) => ({
          title: country,
        })),
    [countries, searchTerm]
  );

  const onSubmit = async (formData: UserCredentials) => {
    if (!formData.recaptcha) {
      return;
    }
    sessionStorage.setItem("email", formData.email);
    const formattedInputForAPi = {
      ...formData,
      role: UserRole.USER,
      country: countries?.findIndex(
        (country: string) => country === formData.country?.title
      ),
    };
    dispatch(registerUser(formattedInputForAPi));
  };

  return (
    <FormContainer>
      <img
        src="company logo.png"
        alt="Biker Xpert Logo"
        style={{ width: "200px", height: "200px", margin: "0 auto" }}
      />
      <FormTitle variant="h4" component="h1">
        Biker Xpert Registration
      </FormTitle>
      <p>
        By signing up for BikerExpert, you’ll be able to manage your bikes in a
        digital garage: access technical documentation, maintenance information,
        and always have your BikerExpert card at hand, your official rider
        document. You'll receive special content, expert advice, and exclusive
        previews of new models. Stay updated on motorcycle events in your
        country and around the world, while enjoying privileged offers. You can
        personalize your experience in the online store and manage your orders,
        addresses, and wishlists.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <MUIInput
          label="Email"
          name="email"
          register={register}
          errors={errors}
          validationRules={{
            required: "Email is required",
            pattern: {
              value: /^[^@]+@[^@]+\.[^@]+$/i,
              message: "Invalid email format",
            },
          }}
        />

        <div style={{ display: "flex", gap: "1rem" }}>
          <MUIInput
            label="First Name"
            name="firstName"
            register={register}
            errors={errors}
            validationRules={{ required: "First name is required" }}
          />
          <MUIInput
            label="Last Name"
            name="lastName"
            register={register}
            errors={errors}
            validationRules={{ required: "Last name is required" }}
          />
        </div>

        <MUIAutocomplete
          label="Country"
          name="country"
          control={control}
          errors={errors}
          validationRules={{
            required: "Country selection is required",
          }}
          options={filteredCountries}
          onChange={setSearchTerm}
        />

        <h4>Consent to the processing of personal data</h4>
        <p>
          Please read our <strong>privacy policy</strong> before proceeding.
        </p>

        <MUICheckbox
          label="I agree to receive marketing emails and offers."
          name="marketing"
          control={control}
        />

        <MUICheckbox
          label="I agree to data profiling for personalized offers."
          name="profiling"
          control={control}
        />
        <RecaptchaContainer>
          {" "}
          <ReCAPTCHACheckBox name="recaptcha" control={control} />
        </RecaptchaContainer>

        <SubmitButton type="submit" variant="contained" size="large">
          Register
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default RegisterForm;
