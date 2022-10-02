/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCursorDataInput = {
  id?: string | null;
  x: number;
  y: number;
  ratioX: number;
  ratioY: number;
  userName?: string | null;
  comment?: string | null;
  roomId?: string | null;
};

export type ModelCursorDataConditionInput = {
  x?: ModelIntInput | null;
  y?: ModelIntInput | null;
  ratioX?: ModelFloatInput | null;
  ratioY?: ModelFloatInput | null;
  userName?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  roomId?: ModelStringInput | null;
  and?: Array<ModelCursorDataConditionInput | null> | null;
  or?: Array<ModelCursorDataConditionInput | null> | null;
  not?: ModelCursorDataConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}

export type ModelFloatInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type CursorData = {
  __typename: "CursorData";
  id: string;
  x: number;
  y: number;
  ratioX: number;
  ratioY: number;
  userName?: string | null;
  comment?: string | null;
  roomId?: string | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateCursorDataInput = {
  id: string;
  x?: number | null;
  y?: number | null;
  ratioX?: number | null;
  ratioY?: number | null;
  userName?: string | null;
  comment?: string | null;
  roomId?: string | null;
};

export type DeleteCursorDataInput = {
  id: string;
};

export type ModelCursorDataFilterInput = {
  id?: ModelIDInput | null;
  x?: ModelIntInput | null;
  y?: ModelIntInput | null;
  ratioX?: ModelFloatInput | null;
  ratioY?: ModelFloatInput | null;
  userName?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  roomId?: ModelStringInput | null;
  and?: Array<ModelCursorDataFilterInput | null> | null;
  or?: Array<ModelCursorDataFilterInput | null> | null;
  not?: ModelCursorDataFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelCursorDataConnection = {
  __typename: "ModelCursorDataConnection";
  items: Array<CursorData | null>;
  nextToken?: string | null;
};

export type CreateCursorDataMutationVariables = {
  input: CreateCursorDataInput;
  condition?: ModelCursorDataConditionInput | null;
};

export type CreateCursorDataMutation = {
  createCursorData?: {
    __typename: "CursorData";
    id: string;
    x: number;
    y: number;
    ratioX: number;
    ratioY: number;
    userName?: string | null;
    comment?: string | null;
    roomId?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateCursorDataMutationVariables = {
  input: UpdateCursorDataInput;
  condition?: ModelCursorDataConditionInput | null;
};

export type UpdateCursorDataMutation = {
  updateCursorData?: {
    __typename: "CursorData";
    id: string;
    x: number;
    y: number;
    ratioX: number;
    ratioY: number;
    userName?: string | null;
    comment?: string | null;
    roomId?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteCursorDataMutationVariables = {
  input: DeleteCursorDataInput;
  condition?: ModelCursorDataConditionInput | null;
};

export type DeleteCursorDataMutation = {
  deleteCursorData?: {
    __typename: "CursorData";
    id: string;
    x: number;
    y: number;
    ratioX: number;
    ratioY: number;
    userName?: string | null;
    comment?: string | null;
    roomId?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type GetCursorDataQueryVariables = {
  id: string;
};

export type GetCursorDataQuery = {
  getCursorData?: {
    __typename: "CursorData";
    id: string;
    x: number;
    y: number;
    ratioX: number;
    ratioY: number;
    userName?: string | null;
    comment?: string | null;
    roomId?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListCursorDataQueryVariables = {
  filter?: ModelCursorDataFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListCursorDataQuery = {
  listCursorData?: {
    __typename: "ModelCursorDataConnection";
    items: Array<{
      __typename: "CursorData";
      id: string;
      x: number;
      y: number;
      ratioX: number;
      ratioY: number;
      userName?: string | null;
      comment?: string | null;
      roomId?: string | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateCursorDataSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateCursorDataSubscription = {
  onCreateCursorData?: {
    __typename: "CursorData";
    id: string;
    x: number;
    y: number;
    ratioX: number;
    ratioY: number;
    userName?: string | null;
    comment?: string | null;
    roomId?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateCursorDataSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateCursorDataSubscription = {
  onUpdateCursorData?: {
    __typename: "CursorData";
    id: string;
    x: number;
    y: number;
    ratioX: number;
    ratioY: number;
    userName?: string | null;
    comment?: string | null;
    roomId?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteCursorDataSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteCursorDataSubscription = {
  onDeleteCursorData?: {
    __typename: "CursorData";
    id: string;
    x: number;
    y: number;
    ratioX: number;
    ratioY: number;
    userName?: string | null;
    comment?: string | null;
    roomId?: string | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};
