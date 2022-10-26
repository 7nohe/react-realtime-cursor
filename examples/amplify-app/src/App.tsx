import "./App.css";
import { ReactRealtimeCursor } from "../../../src/amplify";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import type { UseAuthenticator } from "@aws-amplify/ui-react/dist/types/components/Authenticator/hooks/useAuthenticator";
import "@aws-amplify/ui-react/styles.css";
Amplify.configure(awsconfig);

type Props = Partial<Pick<UseAuthenticator, "signOut" | "user">>;

function App({ signOut, user }: Props) {
  return (
    <div className="App">
      <ReactRealtimeCursor
        amplifyRoomId="MyRoom"
        userName={user?.username}
        cognitoUser={user}
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

export default withAuthenticator(App);
