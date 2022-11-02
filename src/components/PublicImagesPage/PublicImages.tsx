import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Database } from "../../../lib/database.types";
type ImageT = Database["public"]["Tables"]["user-images"]["Row"];

const PublicImages = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const [images, setImages] = useState<ImageT[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPublicImages = async () => {
      setLoading(true);
      const { data, error } = await supabaseClient
        .from("user-images")
        .select("*");

      if (error) {
        toast.error("Error getting public images");
        setLoading(false);
      }

      setImages(data as ImageT[]);
      setLoading(false);
    };

    getPublicImages();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "3rem", textAlign: "center" }}>
        Public Images
      </h1>
      <div
        style={{ width: "80%", display: "flex", gap: "2rem", flexWrap: "wrap" }}
      >
        {images &&
          images.length > 0 &&
          images.map((image) => (
            <div
              key={image.imageSrc}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Image
                src={image.imageSrc as string}
                alt=""
                width={350}
                height={300}
                style={{ objectFit: "cover", borderRadius: "5px" }}
              />
              <p style={{ fontWeight: "bold" }}>{image.description}</p>
            </div>
          ))}

        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default PublicImages;
