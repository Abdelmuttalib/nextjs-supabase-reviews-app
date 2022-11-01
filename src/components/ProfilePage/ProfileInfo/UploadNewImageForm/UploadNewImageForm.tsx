import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useForm } from "react-hook-form";
import { toast as Toast } from "react-toastify";
import { Database } from "../../../../../lib/database.types";
import styles from "./UploadNewImageForm.module.css";
import Image from "next/image";

type UploadImageFieldsT = {
  imageFile: File[] | undefined;
  description: string;
  compressImageOnClient: boolean;
  compressImageOnServer: boolean;
  is_public: boolean;
};

const toast = (
  toastTitle: string,
  toastType: "success" | "info" | "error" | "warning" | "default"
) =>
  Toast(toastTitle, {
    hideProgressBar: true,
    autoClose: 2000,
    type: toastType,
  });

const UploadNewImageForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UploadImageFieldsT>();
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [uploading, setUploading] = useState(false);
  const [inputImagePreviewUrl, setInputImagePreviewUrl] = useState<
    string | null
  >(null);
  const imageFileValue = watch("imageFile");

  const insertImageToDatabase = async (
    imageUrl: string,
    description: string,
    is_public: boolean
  ) => {
    const { data, error } = await supabaseClient.from("user-images").insert({
      imageSrc: imageUrl,
      description,
      is_public,
      user_id: user?.id as string,
    });

    if (error) {
      throw new Error(error.message);
    }

    // set
    reset();
    setInputImagePreviewUrl(null);
    setUploading(false);
    toast("Image Uploaded Successfully", "success");
  };

  const getUploadedImagePublicUrl = async (imagePath: string) => {
    const { data } = await supabaseClient.storage
      .from("images")
      .getPublicUrl(imagePath);

    const { publicUrl: publicImageUrl } = data;

    return publicImageUrl;
  };

  const uploadImageToStorage = async (
    imageFilePath: string,
    imageDecodedFileData: ArrayBuffer,
    fileType: string
  ) => {
    const { data, error: uploadError } = await supabaseClient.storage
      .from("images")
      .upload(imageFilePath, imageDecodedFileData, {
        contentType: fileType,
        upsert: true,
      });

    if (uploadError) {
      throw new Error("Unable to upload image to storage");
    }
  };

  // const onUploadImage = async (imageUploadData) => {};

  const onUploadImageSubmit = async (data: UploadImageFieldsT) => {
    const {
      imageFile: imageFiles,
      description,
      compressImageOnClient,
      compressImageOnServer,
      is_public,
    } = data;

    const inputImage = imageFiles && imageFiles[0];
    if (!inputImage) {
      toast("You must select an image to upload", "error");
      return;
    }

    setUploading(true);

    const compressedFile = await imageCompression(inputImage, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });

    const reader = new FileReader();

    let compressImage = true;
    let imageFile;
    compressImage ? (imageFile = compressedFile) : (imageFile = inputImage);

    reader.readAsDataURL(imageFile);

    reader.onload = async (e) => {
      const image = e.target?.result as string;

      const imageContentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];

      if (!imageContentType || !base64FileData) {
        throw new Error("Image data not valid");
      }

      const fileName = nanoid();
      const ext = imageContentType?.split("/")[1];
      const path = `${fileName}.${ext}`;

      const decodedFileData = decode(base64FileData);
      await uploadImageToStorage(path, decodedFileData, imageContentType);

      const publicImageUrl = await getUploadedImagePublicUrl(path);

      await insertImageToDatabase(publicImageUrl, description, is_public);
    };
  };

  useEffect(() => {
    if (!imageFileValue) setInputImagePreviewUrl(null);
    if (imageFileValue && imageFileValue[0]) {
      const imagePreviewUrl = URL.createObjectURL(imageFileValue[0]);
      setInputImagePreviewUrl(imagePreviewUrl);
    }
  }, [imageFileValue]);

  return (
    <form
      onSubmit={handleSubmit(onUploadImageSubmit)}
      className={styles.imageUploadForm}
    >
      {inputImagePreviewUrl ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Image
            src={inputImagePreviewUrl}
            alt=""
            width={300}
            height={220}
            className={styles.image}
          />
          <button
            type="button"
            onClick={() => {
              setValue("imageFile", undefined);
            }}
            className={styles.removeButton}
            disabled={uploading}
          >
            <XMarkIcon style={{ width: "1.5rem" }} />
            Remove Image
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="imageUpload" className={styles.imageUploadLabel}>
            {uploading ? "Uploading..." : "Upload Image"}
            <input
              className={styles.imageUploadInput}
              id="imageUpload"
              type="file"
              accept="image/*"
              {...register("imageFile", { required: true })}
              disabled={uploading}
            />
          </label>
          {errors.imageFile && (
            <span className={styles["input-error-message"]}>
              *kindly select an image to upload
            </span>
          )}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className={styles["input-container"]}>
          <label htmlFor="description" className={styles["input-label"]}>
            Description:
          </label>
          <input
            className={`${styles.input} ${
              errors.description && styles["input-error"]
            }`}
            id="description"
            type="text"
            placeholder="image description"
            {...register("description", { required: true })}
            disabled={uploading}
            inputMode="text"
          />
          {errors.description && (
            <span className={styles["input-error-message"]}>
              * kindly enter the image description
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="compressImage">
            <input
              id="compressImage"
              type="checkbox"
              {...register("compressImageOnClient")}
              disabled={uploading}
              className={styles.checkbox}
            />
            Compress image on client side
          </label>
          <label htmlFor="compressImageOnServer">
            <input
              id="compressImageOnServer"
              type="checkbox"
              {...register("compressImageOnServer")}
              disabled={uploading}
              className={styles.checkbox}
            />
            Compress image on server side
          </label>
          <label htmlFor="makeImagePublic">
            <input
              id="makeImagePublic"
              type="checkbox"
              {...register("is_public")}
              disabled={uploading}
              className={styles.checkbox}
            />
            Make Image Public
          </label>
        </div>

        <button type="submit" className={styles.button} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </form>
  );
};

export default UploadNewImageForm;
