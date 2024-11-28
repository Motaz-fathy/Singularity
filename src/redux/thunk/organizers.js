import * as apis from "../../network/apis/organizers"
import * as actions from "../actions/organizers"
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess
} from "../../utility/Utils"


// OCCASIONS
export const addOrganizerRequest = ({data, history}) => {
  return (dispatch, getState) => {
    return apis.addOrganizerRequest(data).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        const lang = getState().general.lang
        history.push(`/${lang}/organizers`)
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const requestOrganizers = page => {
  return dispatch => {
    return apis.requestOrganizers(page).then(
      res => {
        dispatch(actions.receiveOrganizers(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}


export const activateDeactivateOrganizerRequest = payload => {
  return dispatch => {
    return apis.activateDeactivateOrganizer(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestOrganizers({ page: 1 }))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const blockUnBlockOrganizerRequest = payload => {
  return dispatch => {
    return apis.blockUnBlockOrganizer(payload).then(
      res => {
        console.log('SSS',res.data)
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestOrganizers({  page: payload.pag}))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

// export const archiveUnarchiveOccasionRequest = payload => {
//   return dispatch => {
//     return apis.archiveUnarchiveOccasion(payload).then(
//       res => {
//         dispatchSnackbarSuccess({
//           msg: res.data.message,
//           isMsgKey: false
//         })
//         dispatch(requestOccasions(1))
//         dispatch(requestArchivedOccasions(1))
//       },
//       err => {
//         if (err.response) {
//           dispatchSnackbarError(err.response.data.message)
//         }
//       }
//     )
//   }
// }

// export const requestArchivedOccasions = page => {
//   return dispatch => {
//     return apis.requestArchivedOccasions(page).then(
//       res => {
//         dispatch(actions.receiveArchivedOccasions(res.data))
//       },
//       err => {
//         if (err.response) {
//           dispatchSnackbarError(err.response.data.message)
//         }
//       }
//     )
//   }
// }
