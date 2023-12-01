import React, { useState } from "react";
import "./App.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormModel } from "./types/FormTypes";
import { UserModel } from "./types/User";
import { fetchUserData } from "./axios/users";
import InputMask from "react-input-mask";

function App() {
  const [dataForForm, setDataForForm] = useState<UserModel>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormModel>();
  const onSubmit: SubmitHandler<FormModel> = async (data) => {
    const responseUser = await fetchUserData(data);
    setDataForForm(responseUser);
  };
  return (
    <div className={"wrapper"}>
      <form className={"form-wrapper"} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={"form"}
          {...register("email", {
            required: "Email is required!",
          })}
          type="email"
          placeholder={"Введите email"}
        />
        {errors.email && (
          <div style={{ color: "red" }}>{errors?.email.message}</div>
        )}
        <InputMask
          className={"form"}
          {...register("number")}
          type="tel"
          placeholder={"Введите номер"}
          mask={"99-99-99"}
        />
        <div>
          <button>Submit</button>
        </div>
      </form>
      {dataForForm && (
        <div className={"user"}>
          <div className={"user__container"}>{dataForForm?.email}</div>
          <div className={"user__container"}>{dataForForm?.number}</div>
        </div>
      )}
    </div>
  );
}

export default App;
