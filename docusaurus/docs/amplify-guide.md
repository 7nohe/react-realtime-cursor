# Amplify Guide

## Installation

```bash
$ npm install aws-amplify @7nohe/react-realtime-cursor
```

Optionally, you can use Amplify UI React.

```bash
$ npm install @aws-amplify/ui-react
```

## Setup

1. Install Amplify CLI

Visit the Amplify documentation to learn how to [install the CLI](https://docs.amplify.aws/cli/).

2. Initialize new project

```bash
$ amplify init
```

3. Setup GraphQL API

```bash
$ amplify add api
```

Only the following configurations are supported.

- API Service: GraphQL
- Authorization Type: Amazon Cognito User Pool

4. Edit schema.graphql

You need to add CursorData type to schema.graphql.

```graphql
type CursorData
  @model
  @auth(rules: [{ allow: private, operations: [read] }, { allow: owner }]) {
  id: ID!
  x: Int!
  y: Int!
  ratioX: Float!
  ratioY: Float!
  userName: String
  comment: String
  roomId: String
}
```

5. Deploy the changes to the cloud

```bash
$ amplify push
```

Now, your API and database tables are set up.

## Usage

After deployment is complete, `aws-exports.js` is created.

Import and load the configuration file.

(You may need to run `amplify pull --appId YOUR_APP_ID --envName YOUR_ENV_NAME` to generate updated `aws-exports.js`)

```tsx
import "./App.css";
import "@7nohe/react-realtime-cursor/dist/style.css"; // import styles
import { ReactRealtimeCursor } from "@7nohe/react-realtime-cursor/amplify";
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
```

In the Amplify backend, `cognitoUser` is required.

You can easily provide the entire authentication flow by using `@aws-amplify/ui-react`.

Also, you need to update vite.config.ts like this

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser", // <- add this
    },
  },
  define: {
    global: {},
  },
});
```
