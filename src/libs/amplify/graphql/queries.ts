/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCursorData = /* GraphQL */ `
  query GetCursorData($id: ID!) {
    getCursorData(id: $id) {
      id
      x
      y
      ratioX
      ratioY
      userName
      comment
      roomId
      createdAt
      updatedAt
    }
  }
`;
export const listCursorData = /* GraphQL */ `
  query ListCursorData(
    $filter: ModelCursorDataFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCursorData(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        x
        y
        ratioX
        ratioY
        userName
        comment
        roomId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
