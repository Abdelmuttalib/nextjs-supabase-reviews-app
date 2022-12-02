import { useState, useEffect } from "react";
import {
  useSupabaseClient,
  useUser,
  useSession,
} from "@supabase/auth-helpers-react";
import { Database } from "../../../../lib/database.types";
import UpdateProfileForm from "./UpdateProfileInfoForm/UpdateProfileInfoForm";
import styles from "./ProfileInfo.module.css";
import Link from "next/link";

type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const ProfileInfo = () => {
  const supabaseClient = useSupabaseClient<Database>();
  const session = useSession();
  const user = useUser();
  const [profileData, setProfileData] = useState<Profiles>();
  const [loading, setLoading] = useState(user ? true : false);

  const queryProfileData = async () =>
    await supabaseClient
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();

  const getProfile = () => {
    if (user) {
      queryProfileData()
        .then(({ data, error, status }) => {
          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            setProfileData(data);
          }
        })
        .catch((error) => {})
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const getMainProfileInfoData = () => {
    if (profileData) {
      const { full_name, username, bio } = profileData;

      const mainProfileData = { username, full_name, bio };

      return mainProfileData;
    } else {
      return { full_name: "", username: "", bio: "" };
    }
  };

  return (
    <>
      <div className={styles.profileInfoContainer}>
        <h1 style={{ whiteSpace: "nowrap" }}>Profile Info</h1>
        {user ? (
          <>
            {profileData && (
              <UpdateProfileForm profileData={getMainProfileInfoData()} />
            )}
          </>
        ) : (
          <p style={{ color: "#4f4f4f" }}>
            Sign In to view your profile{" "}
            <Link href="/auth" style={{ color: "#0070f3" }}>
              Sign In
            </Link>
          </p>
        )}

        {loading && <p>Loading...</p>}
      </div>
    </>
  );
};

export default ProfileInfo;
