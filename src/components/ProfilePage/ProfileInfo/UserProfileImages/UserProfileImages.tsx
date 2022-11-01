import Image from "next/image";
import React from "react";
import { ImageT } from "../../ProfileImages/ProfileImages";
import styles from "./UserProfileImages.module.css";

type Props = {
  images: ImageT[];
};

const UserProfileImages = ({ images }: Props) => {
  return (
    <div className={styles["user-profile-images-container"]}>
      {images.length > 0 ? (
        images.map((image) => (
          <div
            key={image.imageSrc}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Image
              src={image.imageSrc as string}
              alt=""
              width={250}
              height={200}
              className={styles.image}
            />
            <p style={{ fontWeight: "bold" }}>{image.description}</p>
          </div>
        ))
      ) : (
        <p style={{ color: "#4f4f4f", marginBottom: "15rem" }}>
          - you have no images, add new images to your profile to share with
          others
        </p>
      )}
    </div>
  );
};

export default UserProfileImages;
