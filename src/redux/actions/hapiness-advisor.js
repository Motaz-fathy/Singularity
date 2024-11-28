import * as types from "../types/hapiness-advisor"

export const receiveSuggestions = payload => ({
  type: types.RECEIVE_SUGGESTIONS,
  payload
})
