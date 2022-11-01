import { useEffect, useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import styles from "./ProfileImages.module.css";
import { Database } from "../../../../lib/database.types";
import UserProfileImages from "../ProfileInfo/UserProfileImages/UserProfileImages";
import UploadNewImageForm from "../ProfileInfo/UploadNewImageForm/UploadNewImageForm";
import Link from "next/link";
import SkeletonLoader from "../../SkeletonLoader";
export type ImageT = Database["public"]["Tables"]["user-images"]["Row"];

const ProfileImages = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();
  const [images, setImages] = useState<ImageT[]>([]);
  const [loading, setLoading] = useState(user ? true : false);

  useEffect(() => {
    const getImages = async () => {
      if (!loading) setLoading(true);
      const { data: images, error } = await supabaseClient
        .from("user-images")
        .select("*");

      if (error) {
        throw new Error(error.message);
      }

      console.log("images: ", images);
      setImages(images);
      setLoading(false);
    };

    getImages();
  }, []);

  return (
    <div className={styles.container}>
      <h1 style={{ whiteSpace: "nowrap", textAlign: "center" }}>
        Profile Images
      </h1>
      <div className={styles["sections-container"]}>
        <div>
          {user ? (
            <>
              <h2>Upload a new image</h2>
              <UploadNewImageForm />

              {/* Divider */}
              <hr
                style={{
                  margin: "5rem 0",
                  color: "#202020",
                  width: "100%",
                  maxWidth: "1300px",
                }}
              />
              <h2>My images</h2>

              {!loading ? (
                <UserProfileImages images={images} />
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginBottom: "15rem",
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <SkeletonLoader
                      key={i}
                      styles={{
                        width: "10rem",
                        height: "2rem",
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <p style={{ color: "#4f4f4f" }}>
              Sign In to upload images
              <Link
                href="/auth"
                style={{ color: "#0070f3", marginLeft: "0.2rem" }}
              >
                Sign In
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* User Avatar */}
      {/* {true ? (
        <Image src="/vercel.svg" alt="Avatar" width={100} height={100} />
      ) : (
        <div style={{ height: 100, width: 100 }}>s</div>
      )} */}
    </div>
  );
};
export default ProfileImages;
