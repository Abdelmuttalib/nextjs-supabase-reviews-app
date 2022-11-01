import { useState, useEffect } from "react";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import styles from "./Auth.module.css";

type Props = {};

const Auth = (props: Props) => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const user = useUser();
  const [authType, setAuthType] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <div>
      {!user ? (
        <>
          {authType === "sign-in" && (
            <>
              <SignIn />
              <p style={{ color: "#4f4f4f" }}>
                Don&apos;t have an account?{" "}
                <span
                  style={{
                    color: "#0070f3",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  onClick={() => setAuthType("sign-up")}
                >
                  Sign Up
                </span>
              </p>
            </>
          )}
          {authType === "sign-up" && (
            <>
              <SignUp />
              <p style={{ color: "#4f4f4f" }}>
                Already have an account?{" "}
                <span
                  style={{
                    color: "#0070f3",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                  onClick={() => setAuthType("sign-in")}
                >
                  Sign In
                </span>
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <p>{user.email}</p>
          <button
            onClick={async () => {
              await supabaseClient.auth.signOut();
            }}
            className={styles.button}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
