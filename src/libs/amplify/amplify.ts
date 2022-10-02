import { AmplifyApp } from "../../types";

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
