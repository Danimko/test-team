import InputMask from "react-input-mask";
import React, { useState } from "react";
import { UserModel } from "../types/User";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormModel } from "../types/FormTypes";
import { fetchUserData } from "../axios/users";

export const MyForm = () => {
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
    <>
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
          <button className={"submit-button"}>Submit</button>
        </div>
      </form>
      {dataForForm && (
        <div className={"user"}>
          <div className={"user__container"}>{dataForForm.email}</div>
          <div className={"user__container"}>{dataForForm.number}</div>
        </div>
      )}
    </>
  );
};
