# Supabase Guide

## Installation

```bash
$ npm install @supabase/supabase-js @7nohe/react-realtime-cursor
```

Optionally, you can use Auth UI package.

```bash
$ npm install @supabase/auth-ui-react
```

## Setup

This library uses Supabase's [Broadcast](https://supabase.com/docs/guides/realtime/broadcast).  
Therefore, you must first create a Supabase project at [supabase.com](https://supabase.com).

## Usage

```jsx
import "./App.css";
import "@7nohe/react-realtime-cursor/dist/style.css"; // import styles
import { ReactRealtimeCursor } from "@7nohe/react-realtime-cursor/supabase";
import { useEffect, useState } from "react";
import { createClient, User } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_KEY',
);

function App() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    init();
    // Listen for login events and set user
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
      >
        <button onClick={() => console.log("Clicked")}>Click me</button>
      </ReactRealtimeCursor>
    </div>
  );
}

export default App;
```
