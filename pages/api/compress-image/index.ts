// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import imageCompression from "browser-image-compression";
import { Database } from "../../../lib/database.types";
import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";

type Data = {
  image: string;
  userId: any;
  description: string;
  is_public: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  console.log("RE: ", req);
  if (req.method === "POST") {
    try {
      const { image, userId, description, is_public } = req.body;
      // const supabaseClient = useSupabaseClient<Database>();
      const supabaseServerClient = createServerSupabaseClient<Database>({
        req,
        res,
      });

      const compressedFile = await imageCompression(image, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      const reader = new FileReader();

      reader.readAsDataURL(compressedFile);

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
        await supabaseServerClient.storage
          .from("images")
          .upload(path, decodedFileData, {
            contentType: imageContentType,
            upsert: true,
          });

        const { data: dataUrl } = await supabaseServerClient.storage
          .from("images")
          .getPublicUrl(path);

        const { publicUrl: publicImageUrl } = dataUrl;

        await supabaseServerClient.from("user-images").insert({
          imageSrc: publicImageUrl,
          description,
          is_public,
          user_id: userId,
        });
      };

      res.status(200).json({ image, userId, description, is_public });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
