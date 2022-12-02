import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { Database } from "../../../lib/database.types";
import styles from "./PeerReview.module.css";
import PeerReviewForm from "./PeerReviewForm/PeerReviewForm";
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];

const PeerReview = () => {
  const session = useSession();
  const user = useUser();
  const [loading, setLoading] = useState(user ? true : false);
  const [profilesData, setProfilesData] = useState<Profiles[]>();
  const supabaseClient = useSupabaseClient<Database>();
  const [selectedProfile, setSelectedProfile] = useState<Profiles>();

  const queryProfilsData = async () =>
    await supabaseClient.from("profiles").select("*");

  const getProfiles = () => {
    if (user) {
      queryProfilsData()
        .then(({ data, error, status }) => {
          if (error && status !== 406) {
            throw error;
          }
          if (data) {
            setProfilesData(data);
          }
        })
        .catch((error) => {})
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Peer Review</h1>
      <div className={styles.container}>
        <div className={styles["peer-cards-container"]}>
          {profilesData &&
            profilesData.map((profile) => (
              <div
                key={profile.id}
                className={`${styles["peer-card"]} ${
                  selectedProfile?.id === profile.id &&
                  styles["peer-card-selected"]
                }`}
              >
                <div className={styles["peer-card-content"]}>
                  <span className={styles["peer-profile-name"]}>
                    {profile.full_name}
                  </span>
                  <span className={styles["gray-text"]}>{profile.bio}</span>
                  <span className={styles["gray-text"]}>
                    @{profile.username}
                  </span>
                </div>

                <button
                  type="button"
                  className={styles.button}
                  onClick={() => setSelectedProfile(profile)}
                >
                  Review
                </button>
              </div>
            ))}
          {loading && <div>Loading...</div>}
        </div>
        {selectedProfile && (
          <PeerReviewForm selectedProfile={selectedProfile} />
        )}
      </div>
    </>
  );
};

export default PeerReview;
