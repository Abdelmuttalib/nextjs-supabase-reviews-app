import { useState, useEffect } from "react";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";

type Props = {};

const Auth = (props: Props) => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const user = useUser();
  const [data, setData] = useState();

  useEffect(() => {
    console.log("user: ", user);
    async function loadData() {
      const { data } = await supabaseClient.from("profiles").select("*");
      setData(data);
    }
    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);
  return (
    <div>
      {" "}
      {!user ? (
        <>
          <SignUp supabaseClient={supabaseClient} />
          <SignIn supabaseClient={supabaseClient} />
        </>
      ) : (
        <>
          <p>{user.email}</p>
          <button
            onClick={() => {
              console.log("signing out");
              supabaseClient.auth.signOut();
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;

const SignUp = ({ supabaseClient }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
    });

    console.log(data);
    console.log(error);
  };

  return (
    <div>
      Sign up:
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

const SignIn = ({ supabaseClient }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });

    console.log(data);
    console.log(error);
  };

  return (
    <div>
      Sign in:
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};
