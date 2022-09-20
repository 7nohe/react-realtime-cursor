import { getCursorData } from "./graphql/queries";
import { CursorHandler, AmplifyApp } from "../../types";
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

type AmplifyAppOptions = {
  roomId: string;
};

export const initializeAmplifyApp: (
  options: AmplifyAppOptions
) => Pick<AmplifyApp, "roomId"> = (options) => {
  const { roomId } = options;
  return {
    roomId,
  };
};

export const createAmplifyHandler: (app: AmplifyApp) => CursorHandler = (
  options
) => {
  const { cognitoUser } = options;
  return {
    initialize: async (
      currentUserId: string | null,
      onUserIdChanged: (userId: string | null) => void,
      handleCursor: (eventName: string, key: string | null, value: any) => void
    ) => {
      const init = async () => {
        try {
          if (!cognitoUser.username) {
            throw Error("cognito user not found");
          }
          onUserIdChanged(cognitoUser.username);
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
      // TODO: onAuthStateChanged

      if (!currentUserId) return;

      const result = await API.graphql<GraphQLQuery<GetCursorDataQuery>>({
        query: getCursorData,
        variables: { id: currentUserId },
      });
      const data = result.data?.getCursorData;
      if (!data) return;
      const id = data?.id;
      Object.values(data).forEach((value: any) => {
        if (id === currentUserId) {
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
          owner: currentUserId,
        },
      }).subscribe({
        next: ({ value }) => {
          const cursorData = value.data?.onCreateCursorData;
          if (cursorData?.id === currentUserId) {
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
          owner: currentUserId,
        },
      }).subscribe({
        next: ({ value }) => {
          const cursorData = value.data?.onUpdateCursorData;
          if (cursorData?.id === currentUserId) {
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
          owner: currentUserId,
        },
      }).subscribe({
        next: ({ value }) => {
          const cursorData = value.data?.onDeleteCursorData;
          if (cursorData?.id === currentUserId) {
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
    disconnect: () => {},
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
