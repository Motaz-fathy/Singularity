import * as apis from "../../network/apis/occasions"
import * as actions from "../../redux/actions/occasions"
import {
  dispatchSnackbarError,
  dispatchSnackbarSuccess
} from "../../utility/Utils"

// OCCASIONS GROUPS
export const addOccasionGroupRequest = ({data, history}) => {
  return (dispatch, getState) => {
    return apis.addOccasionGroupRequest(data).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        const lang = getState().general.lang
        history.push(`/${lang}/occasions/groups`)
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const requestOccasionsGroups = page => {
  return dispatch => {
    return apis.requestOccasionsGroups(page).then(
      res => {
        dispatch(actions.receiveOccasionsGroups(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}
export const requestGroupAssignedOccasions = payload => {
  return dispatch => {
    return apis.requestGroupAssignedOccasions(payload).then(
      res => {
        dispatch(actions.receiveGroupAssignedOccasions(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const filterOccasionsGroups = payload => {
  return dispatch => {
    return apis.filterOccasionsGroups(payload).then(
      res => {
        dispatch(actions.receiveOccasionsGroups(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const editOccasionGroupRequest = ({data, history}) => {
  return (dispatch, getState) => {
    return apis.editOccasionGroupRequest(data).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        const lang = getState().general.lang
        history.push(`/${lang}/occasions/groups`)
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}
export const activateDeactivateOccasionGroupRequest = payload => {
  return dispatch => {
    return apis.activateDeactivateOccasionGroup(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestOccasionsGroups(1))
        dispatch(requestArchivedOccasionsGroups(1))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}
export const archiveUnarchiveOccasionGroupRequest = (payload, history) => {
  return (dispatch, getState) => {
    return apis.archiveUnarchiveOccasionGroup(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestOccasionsGroups(1))
        dispatch(requestArchivedOccasionsGroups(1))
        if (history) {
          const lang = getState().general.lang
          history.push(`/${lang}/occasions/groups`)
        }
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const requestArchivedOccasionsGroups = page => {
  return dispatch => {
    return apis.requestArchivedOccasionsGroups(page).then(
      res => {
        dispatch(actions.receiveArchivedOccasionsGroups(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

// OCCASIONS
export const addOccasionRequest = ({data, history}) => {
  return (dispatch, getState) => {
    return apis.addOccasionRequest(data).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        const lang = getState().general.lang
        history.push(`/${lang}/occasions/occasion`)
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const requestOccasions = page => {
  return dispatch => {
    return apis.requestOccasions(page).then(
      res => {
        dispatch(actions.receiveOccasions(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const filterOccasions = payload => {
  return dispatch => {
    return apis.filterOccasions(payload).then(
      res => {
        dispatch(actions.receiveOccasions(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const editOccasionRequest = ({data, history}) => {
  return (dispatch, getState) => {
    return apis.editOccasionRequest(data).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        const lang = getState().general.lang
        history.push(`/${lang}/occasions/occasion`)
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const activateDeactivateOccasionRequest = payload => {
  return dispatch => {
    return apis.activateDeactivateOccasion(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestOccasions(1))
        dispatch(requestArchivedOccasions(1))
        // dispatch(
        //   requestGroupAssignedOccasions({ id: payload.groupId, page: 1 })
        // );
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const archiveUnarchiveOccasionRequest = payload => {
  return dispatch => {
    return apis.archiveUnarchiveOccasion(payload).then(
      res => {
        dispatchSnackbarSuccess({
          msg: res.data.message,
          isMsgKey: false
        })
        dispatch(requestOccasions(1))
        dispatch(requestArchivedOccasions(1))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}

export const requestArchivedOccasions = page => {
  return dispatch => {
    return apis.requestArchivedOccasions(page).then(
      res => {
        dispatch(actions.receiveArchivedOccasions(res.data))
      },
      err => {
        if (err.response) {
          dispatchSnackbarError(err.response.data.message)
        }
      }
    )
  }
}
