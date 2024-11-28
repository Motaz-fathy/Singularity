import * as types from "../types/occasions"

export const receiveOccasionsGroups = payload => ({
  type: types.RECEIVE_OCCASIONS_GROUPS,
  payload
})
export const receiveGroupAssignedOccasions = payload => ({
  type: types.RECEIVE_GROUP_ASSIGNED_OCCASIONS,
  payload
})
export const receiveArchivedOccasionsGroups = payload => ({
  type: types.RECEIVE_ARCHIVED_OCCASIONS_GROUPS,
  payload
})
export const receiveOccasions = payload => ({
  type: types.RECEIVE_OCCASIONS,
  payload
})
export const receiveArchivedOccasions = payload => ({
  type: types.RECEIVE_ARCHIVED_OCCASIONS,
  payload
})
