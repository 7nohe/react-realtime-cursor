import "./App.css";
import { ReactRealtimeCursor } from "../../../src/supabase";
import { useEffect, useState } from "react";
import { createClient, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });
  }, []);

  if (!user) {
    return <Auth supabaseClient={supabase} providers={[]} />;
  }
  return (
    <div className="App">
      <ReactRealtimeCursor
        supabaseApp={{
          client: supabase,
          roomId: "myRoom",
          userId: user.id,
        }}
        userName={user.email}
        style={{
          backgroundColor: "white",
          maxWidth: 860,
          maxHeight: 640,
          padding: 20,
        }}
      >
        <button onClick={() => console.log("Clicked")}>Click me</button>
      </ReactRealtimeCursor>
    </div>
  );
}

export default App;
