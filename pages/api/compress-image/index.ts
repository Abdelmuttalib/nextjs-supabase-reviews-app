// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import imageCompression from "browser-image-compression";
import { Database } from "../../../lib/database.types";

type Data = {
  image: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { image, contentType } = req.body;
    // const supabaseClient = useSupabaseClient<Database>();
    const supabaseServerClient = createServerSupabaseClient<Database>({
      req,
      res,
    });
    const {
      data: { user },
    } = await supabaseServerClient.auth.getUser();

    const compressedFile = await imageCompression(image, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
  }
}
