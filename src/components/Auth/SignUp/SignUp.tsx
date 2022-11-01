import { useSessionContext } from "@supabase/auth-helpers-react";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../Auth.module.css";

type SignInFieldsT = {
  email: string;
  password: string;
};

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFieldsT>();
  const { supabaseClient } = useSessionContext();

  const onSignUp = async (data: SignInFieldsT) => {
    const { email, password } = data;

    const { data: signUpData, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    console.log(signUpData);
    console.log(error);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSignUp)}
        className={styles["form-container"]}
      >
        {/* Email */}
        <div className={styles["input-container"]}>
          <label htmlFor="email" className={styles["input-label"]}>
            Email
          </label>
          <input
            id="email"
            className={`${styles.input} ${
              errors.email && styles["input-error"]
            }`}
            {...register("email", { required: true })}
            type="text"
            placeholder="your email address"
          />
          {errors.email && (
            <p className={styles["input-error-message"]}>
              * kindly enter your email address
            </p>
          )}
        </div>

        {/* Password */}
        <div className={styles["input-container"]}>
          <label htmlFor="password" className={styles["input-label"]}>
            Password
          </label>
          <input
            id="password"
            className={`${styles.input} ${
              errors.password && styles["input-error"]
            }`}
            {...register("password", { required: true })}
            type="password"
            placeholder="your password"
          />
          {errors.password && (
            <p className={styles["input-error-message"]}>
              * kindly enter your password
            </p>
          )}
        </div>

        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
