import * as apis from "../../network/apis/service_providers"
import * as actions from "../../redux/actions/service_providers"
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess
} from "../../utility/Utils"

export const addServiceProvider = ({ data, history }) => {
  return (dispatch, getState) => {
    return apis.addServiceProviderRequest(data).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        const lang = getState().general.lang
        history.push(`/${lang}/service_provider`)
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const editServiceProvider = ({ data, id, history }) => {
  return (dispatch, getState) => {
    return apis.editServiceProviderRequest(data, id).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        const lang = getState().general.lang
        history.push(`/${lang}/service_provider`)
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const requestServiceProviders = params => {
  return dispatch => {
    return apis.requestServiceProviders(params).then(
      res => {
        dispatch(actions.receiveServiceProviders(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const activateDeactivateServiceProvider = payload => {
  return dispatch => {
    return apis.activateDeactivateServiceProvider(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestServiceProviders({ page: payload.page }))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const blockUnblockServiceProvider = payload => {
  return dispatch => {
    return apis.blockUnblockServiceProvider(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestServiceProviders({ page: payload.page }))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const verifyUnVerifyServiceProvider = payload => {
  return dispatch => {
    return apis.verifyUnVerifyServiceProvider(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestServiceProviders({ page: payload.page }))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}












// export const filterOccasions = payload => {
//   return dispatch => {
//     return apis.filterOccasions(payload).then(
//       res => {
//         dispatch(actions.receiveOccasions(res.data))
//       },
//       err => {
//         if (err.response) {
//           dispatchSnackbarError(err.response.data.message)
//         }
//       }
//     )
//   }
// }

// export const editOccasionRequest = ({ data, history }) => {
//   return (dispatch, getState) => {
//     return apis.editOccasionRequest(data).then(
//       res => {
//         dispatchSnackbarSuccess({
//           msg: res.data.message,
//           isMsgKey: false
//         })
//         const lang = getState().general.lang
//         history.push(`/${lang}/occasions/occasion`)
//       },
//       err => {
//         if (err.response) {
//           dispatchSnackbarError(err.response.data.message)
//         }
//       }
//     )
//   }
// }

// export const activateDeactivateOccasionRequest = payload => {
//   return dispatch => {
//     return apis.activateDeactivateOccasion(payload).then(
//       res => {
//         dispatchSnackbarSuccess({
//           msg: res.data.message,
//           isMsgKey: false
//         })
//         dispatch(requestOccasions(1))
//         dispatch(requestArchivedOccasions(1))
//         dispatch(
//           requestGroupAssignedOccasions({ id: payload.groupId, page: 1 })
//         )
//       },
//       err => {
//         if (err.response) {
//           dispatchSnackbarError(err.response.data.message)
//         }
//       }
//     )
//   }
// }

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
