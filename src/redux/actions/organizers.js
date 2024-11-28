import * as types from "../types/organizers"



export const receiveOrganizers = payload => ({
  type: types.RECEIVE_ORGANIZERS,
  payload
})
