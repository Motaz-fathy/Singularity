import * as types from "../types/occasions"

const INITIAL_STATE = {
  occasionsGroupsList: [],
  occasionsGroupsListMetaData: {},
  groupAssignedOccasions: [],
  groupAssignedOccasionsMetaData: {},
  archivedOccasionsGroupsList: [],
  archivedOccasionsGroupsListMetaData: {},

  occasionsList: [],
  occasionsListMetaData: {},
  archivedOccasionsList: [],
  archivedOccasionsListMetaData: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.RECEIVE_OCCASIONS_GROUPS:
      return {
        ...state,
        occasionsGroupsList: [...action.payload.data.occasion_groups],
        occasionsGroupsListMetaData: { ...action.payload.meta }
      }
    case types.RECEIVE_GROUP_ASSIGNED_OCCASIONS:
      return {
        ...state,
        groupAssignedOccasions: [...action.payload.data.occasion],
        groupAssignedOccasionsMetaData: { ...action.payload.meta }
      }
    case types.RECEIVE_ARCHIVED_OCCASIONS_GROUPS:
      return {
        ...state,
        archivedOccasionsGroupsList: [...action.payload.data.occasion_groups],
        archivedOccasionsGroupsListMetaData: { ...action.payload.meta }
      }
    case types.RECEIVE_OCCASIONS:
      return {
        ...state,
        occasionsList: [...action.payload.data.occasion],
        occasionsListMetaData: { ...action.payload.meta }
      }
    case types.RECEIVE_ARCHIVED_OCCASIONS:
      return {
        ...state,
        archivedOccasionsList: [...action.payload.data.occasion],
        archivedOccasionsListMetaData: { ...action.payload.meta }
      }
    default:
      return state
  }
}
