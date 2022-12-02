import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../../lib/database.types";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Profiles } from "../PeerReview";
import styles from "./PeerReviewForm.module.css";

type Props = {
  selectedProfile: Profiles;
};

const PeerReviewForm = ({ selectedProfile }: Props) => {
  const supabaseClient = useSupabaseClient<Database>();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      required_rating: {
        presentation_score: {
          score: 0,
          comment: "",
        },
        technical_score: { score: 0, comment: "" },
        assists_peers_score: { score: 0, comment: "" },
        documentation_score: { score: 0, comment: "" },
      },
      optional_rating: {
        stood_out: "",
      },
    },
  });

  const onReview = async (data: any) => {
    const { data: newReviewData, error } = await supabaseClient
      .from("peers-reviews")
      .insert({
        user_id: selectedProfile.id,
        review: data,
      });

    if (error) toast.error("Error while submitting review");

    if (!error) {
      reset();
      toast.success("Review submitted successfully");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onReview)}
        className={styles["form-container"]}
      >
        {/* Name */}
        <div className={styles["input-container"]}>
          <label htmlFor="name" className={styles["input-label"]}>
            Name
          </label>
          <input
            id="name"
            className={`${styles.input} ${
              errors.name && styles["input-error"]
            }`}
            {...register("name", { required: true })}
            type="text"
            placeholder="comment "
          />
          {errors.name && (
            <p className={styles["input-error-message"]}>
              * kindly enter your name
            </p>
          )}
        </div>

        {/* Presentation Score */}
        <div>
          <h3>Presenation Score</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Controller
              name="required_rating.presentation_score.score"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.presentation_score.score"
                    className={styles["input-label"]}
                  >
                    Score
                  </label>
                  <input
                    id="required_rating.presentation_score.score"
                    className={`${styles.input} ${
                      errors.name && styles["input-error"]
                    }`}
                    type="number"
                    value={value}
                    onChange={onChange}
                    placeholder="your name "
                  />
                  {errors.required_rating?.presentation_score?.score && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter score
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="required_rating.presentation_score.comment"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.presentation_score.comment"
                    className={styles["input-label"]}
                  >
                    Comment
                  </label>
                  <input
                    id="required_rating.presentation_score.comment"
                    className={`${styles.input} ${
                      errors.name && styles["input-error"]
                    }`}
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="your name "
                  />
                  {errors.required_rating?.presentation_score?.comment && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter overall value
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Technical Score */}
        <div>
          <h3>Technical Score</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Controller
              name="required_rating.technical_score.score"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.technical_score.score"
                    className={styles["input-label"]}
                  >
                    Score
                  </label>
                  <input
                    id="required_rating.technical_score.score"
                    className={`${styles.input} ${
                      errors.required_rating?.technical_score?.score &&
                      styles["input-error"]
                    }`}
                    type="number"
                    value={value}
                    onChange={onChange}
                    placeholder="score"
                  />
                  {errors.required_rating?.technical_score?.score && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter score
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="required_rating.technical_score.comment"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.technical_score.comment"
                    className={styles["input-label"]}
                  >
                    Comment
                  </label>
                  <input
                    id="required_rating.technical_score.comment"
                    className={`${styles.input} ${
                      errors.required_rating?.technical_score?.comment &&
                      styles["input-error"]
                    }`}
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="comment"
                  />
                  {errors.required_rating?.technical_score?.comment && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter a comment
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Assists Peers Score */}
        <div>
          <h3>Assists Peers Score</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Controller
              name="required_rating.assists_peers_score.score"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.technical_score.score"
                    className={styles["input-label"]}
                  >
                    Score
                  </label>
                  <input
                    id="required_rating.technical_score.score"
                    className={`${styles.input} ${
                      errors.required_rating?.assists_peers_score?.score &&
                      styles["input-error"]
                    }`}
                    type="number"
                    value={value}
                    onChange={onChange}
                    placeholder="score"
                  />
                  {errors.required_rating?.assists_peers_score?.score && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter score
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="required_rating.assists_peers_score.comment"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.technical_score.comment"
                    className={styles["input-label"]}
                  >
                    Comment
                  </label>
                  <input
                    id="required_rating.technical_score.comment"
                    className={`${styles.input} ${
                      errors.required_rating?.assists_peers_score?.comment &&
                      styles["input-error"]
                    }`}
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="comment"
                  />
                  {errors.required_rating?.assists_peers_score?.comment && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter a comment
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Documentation Score */}
        <div>
          <h3>Assists Peers Score</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Controller
              name="required_rating.documentation_score.score"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.documentation_score.score"
                    className={styles["input-label"]}
                  >
                    Score
                  </label>
                  <input
                    id="required_rating.documentation_score.score"
                    className={`${styles.input} ${
                      errors.required_rating?.documentation_score?.score &&
                      styles["input-error"]
                    }`}
                    type="number"
                    value={value}
                    onChange={onChange}
                    placeholder="score"
                  />
                  {errors.required_rating?.documentation_score?.score && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter score
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="required_rating.documentation_score.comment"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <div className={styles["input-container"]}>
                  <label
                    htmlFor="required_rating.documentation_score.comment"
                    className={styles["input-label"]}
                  >
                    Comment
                  </label>
                  <input
                    id="required_rating.documentation_score.comment"
                    className={`${styles.input} ${
                      errors.required_rating?.documentation_score?.comment &&
                      styles["input-error"]
                    }`}
                    type="text"
                    value={value}
                    onChange={onChange}
                    placeholder="comment"
                  />
                  {errors.required_rating?.documentation_score?.comment && (
                    <p className={styles["input-error-message"]}>
                      * kindly enter a comment
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Optional rating Score */}
        <div>
          <h3>Stood out (optional)</h3>
          <Controller
            name="optional_rating.stood_out"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <div className={styles["input-container"]}>
                <input
                  id="optional_rating.stood_out"
                  className={`${styles.input} ${
                    errors.optional_rating?.stood_out && styles["input-error"]
                  }`}
                  type="number"
                  value={value}
                  onChange={onChange}
                  placeholder="score"
                />
                {errors.optional_rating?.stood_out && (
                  <p className={styles["input-error-message"]}>
                    * kindly enter comment
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <button type="submit" className={styles.button}>
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default PeerReviewForm;
