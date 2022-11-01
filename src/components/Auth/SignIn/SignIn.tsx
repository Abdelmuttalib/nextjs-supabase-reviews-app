import { useSessionContext } from "@supabase/auth-helpers-react";
import React from "react";
import { useForm } from "react-hook-form";
import styles from "../Auth.module.css";

type SignInFieldsT = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFieldsT>();
  const { supabaseClient } = useSessionContext();

  const onSignIn = async (data: SignInFieldsT) => {
    const { email, password } = data;

    const { data: signInData, error } =
      await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

    console.log(signInData);
    console.log(error);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Sign In</h1>
      <form
        onSubmit={handleSubmit(onSignIn)}
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
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
