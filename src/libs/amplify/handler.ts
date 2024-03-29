import { getCursorData } from "./graphql/queries";
import { AmplifyApp, AmplifyCursorHandler } from "../../types";
import { API, Hub } from "aws-amplify";
import { CONNECTION_STATE_CHANGE, ConnectionState } from "@aws-amplify/pubsub";

import {
  CreateCursorDataMutation,
  DeleteCursorDataMutation,
  GetCursorDataQuery,
  OnCreateCursorDataSubscription,
  OnDeleteCursorDataSubscription,
  OnUpdateCursorDataSubscription,
  UpdateCursorDataMutation,
} from "./API";
import {
  onCreateCursorData,
  onDeleteCursorData,
  onUpdateCursorData,
} from "./graphql/subscriptions";
import { GraphQLSubscription, GraphQLQuery } from "@aws-amplify/api";
import {
  createCursorData,
  deleteCursorData,
  updateCursorData,
} from "./graphql/mutations";

export const createAmplifyHandler: (app: AmplifyApp) => AmplifyCursorHandler = (
  options
) => {
  const { cognitoUser } = options;
  return {
    initialize: async (
      handleCursor: (eventName: string, key: string | null, value: any) => void
    ) => {
      const init = async () => {
        try {
          if (!cognitoUser.username) {
            throw Error("cognito user not found");
          }
          await API.graphql<GraphQLQuery<CreateCursorDataMutation>>({
            query: createCursorData,
            variables: {
              input: {
                id: cognitoUser.username,
                x: 0,
                y: 0,
                ratioX: 0,
                ratioY: 0,
                userName: "",
                comment: "",
              },
            },
            authMode: "AMAZON_COGNITO_USER_POOLS",
          });
        } catch (e) {
          console.log("Cursor data is already initialized");
        }
      };

      await init();

      if (!cognitoUser.username) return;

      const result = await API.graphql<GraphQLQuery<GetCursorDataQuery>>({
        query: getCursorData,
        variables: { id: cognitoUser.username },
      });
      const data = result.data?.getCursorData;
      if (!data) return;
      const id = data?.id;
      Object.values(data).forEach((value: any) => {
        if (id === cognitoUser.username) {
          return;
        }
        handleCursor("add", id, value);
      });

      const onCreateCursorDataSubscription = API.graphql<
        GraphQLSubscription<OnCreateCursorDataSubscription>
      >({
        query: onCreateCursorData,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          owner: cognitoUser.username,
        },
      }).subscribe({
        next: ({ value }) => {
          const cursorData = value.data?.onCreateCursorData;
          if (cursorData?.id === cognitoUser.username) {
            return;
          }
          handleCursor("add", cursorData?.id ?? null, cursorData);
        },
        error: (error) => console.warn(error),
      });

      const onUpdateCursorDataSubscription = API.graphql<
        GraphQLSubscription<OnUpdateCursorDataSubscription>
      >({
        query: onUpdateCursorData,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          owner: cognitoUser.username,
        },
      }).subscribe({
        next: ({ value }) => {
          const cursorData = value.data?.onUpdateCursorData;
          if (cursorData?.id === cognitoUser.username) {
            return;
          }
          handleCursor("change", cursorData?.id ?? null, cursorData);
        },
        error: (error) => console.warn(error),
      });

      const onDeleteCursorDataSubscription = API.graphql<
        GraphQLSubscription<OnDeleteCursorDataSubscription>
      >({
        query: onDeleteCursorData,
        authMode: "AMAZON_COGNITO_USER_POOLS",
        variables: {
          owner: cognitoUser.username,
        },
      }).subscribe({
        next: ({ value }) => {
          const cursorData = value.data?.onDeleteCursorData;
          if (cursorData?.id === cognitoUser.username) {
            return;
          }
          handleCursor("remove", cursorData?.id ?? null, cursorData);
        },
        error: (error) => console.warn(error),
      });

      return {
        disconnect: () => {
          onCreateCursorDataSubscription.unsubscribe();
          onUpdateCursorDataSubscription.unsubscribe();
          onDeleteCursorDataSubscription.unsubscribe();
        },
      };
    },
    onCursorPositionChanged: async (data) => {
      const { id } = data;
      if (id) {
        API.graphql<GraphQLQuery<UpdateCursorDataMutation>>({
          query: updateCursorData,
          variables: {
            input: { ...data, id, roomId: "" },
          },
        });
        Hub.listen("api", (data: any) => {
          const { payload } = data;
          if (payload.event === CONNECTION_STATE_CHANGE) {
            const connectionState = payload.data
              .connectionState as ConnectionState;
            if (connectionState === ConnectionState.Disconnected) {
              API.graphql<GraphQLQuery<DeleteCursorDataMutation>>({
                query: deleteCursorData,
                variables: { id },
              });
            }
          }
        });
      }
    },
  };
};
