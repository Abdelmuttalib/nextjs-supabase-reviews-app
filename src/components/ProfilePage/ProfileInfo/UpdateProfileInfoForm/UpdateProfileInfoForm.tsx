import { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./UpdateProfileInfoForm.module.css";
import { Database } from "../../../../../lib/database.types";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

type ProfileFieldsT = {
  full_name: Profiles["full_name"];
  username: Profiles["username"];
  bio: Profiles["bio"];
};

type Props = {
  profileData: {
    full_name: Profiles["full_name"];
    username: Profiles["username"];
    bio: Profiles["bio"];
  };
};

const UpdateProfileForm = ({ profileData }: Props) => {
  console.log(profileData.username);
  const { full_name, username, bio } = profileData;
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: profileData && { full_name, username, bio } });

  const updateProfileQuery = async (data: ProfileFieldsT) =>
    await supabaseClient.from("profiles").update(data).eq("id", user?.id);

  const updateProfile = (updateData: ProfileFieldsT) => {
    if (!loading) setLoading(true);
    updateProfileQuery(updateData)
      .then(({ data, error, status }) => {
        if (error && status !== 406) {
          throw error;
        }

        alert("Profile updated!");
      })
      .catch((error) => {
        alert("Error updating the data!");
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const onUpdateProfileSubmit: SubmitHandler<ProfileFieldsT> = (data) => {
    updateProfile(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onUpdateProfileSubmit)}
      className={styles.updateProfileForm}
    >
      <div className={styles["input-container"]}>
        <label htmlFor="full_name" className={styles["input-label"]}>
          Full Name
        </label>
        <input
          className={styles.input}
          {...register("full_name", { required: true })}
          type="text"
          placeholder="full name"
        />{" "}
      </div>

      <div className={styles["input-container"]}>
        <label htmlFor="username" className={styles["input-label"]}>
          Username
        </label>
        <input
          className={styles.input}
          {...register("username", { required: true })}
          type="text"
          placeholder="username"
        />
      </div>

      <div className={styles["input-container"]}>
        <label htmlFor="bio" className={styles["input-label"]}>
          Bio
        </label>
        <input
          className={styles.input}
          {...register("bio", { required: true })}
          type="text"
          placeholder="bio"
        />
        {errors.bio && (
          <p className={styles["input-error-message"]}>* Bio is required</p>
        )}
      </div>

      <button type="submit" className={styles.button}>
        Update
      </button>
    </form>
  );
};

export default UpdateProfileForm;
