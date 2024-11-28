import { store } from "../redux/storeConfig/store"
import { setSnackbar } from "../redux/actions/general"
import messagesAr from "../assets/data/locales/ar.json"
import messagesEn from "../assets/data/locales/en.json"
import Tooltip from "../components/Tooltip/Tooltip"

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, "")

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: "short", day: "numeric" }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" }
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value))
}

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === "admin") return "/"
  if (userRole === "client") return "/access-control"
  return "/login"
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "rgba(109, 74, 172, 0.6)", // for option hover bg-color
    primary: "rgba(109, 74, 172, 1) ", // for selected option bg-color
    neutral10: "rgba(109, 74, 172, 1)", // for tags bg-color
    neutral20: "#d8d6de", // for input border-color
    neutral30: "#d8d6de" // for input hover border-color
  }
})

export const dispatchSnackbarError = msg => {
  store.dispatch(setSnackbar({ visible: true, message: msg, color: "danger" }))
}
export const dispatchSnackbarSuccess = ({ msg, isMsgKey }) => {
  const lang = store.getState().general.lang
  const messages = lang === "en" ? messagesEn : messagesAr
  store.dispatch(
    setSnackbar({
      visible: true,
      message: isMsgKey ? messages.SUCCESS_MSGS[msg] : msg,
      color: "success"
    })
  )
}

// Example on using getQueryString(useLocation().search, "token");
export const getQueryString = (search, string) => {
  const query = new URLSearchParams(search)
  return query.get(string)
}

export const getInitials = str => {
  const results = []
  const wordArray = str.split(" ")
  wordArray.forEach(e => {
    results.push(e[0])
  })
  return results.join("")
}

// For handling tables pagination FE
export const getTablePageData = (data, pageNo, entriesPerPage) => {
  const dataCopy = JSON.parse(JSON.stringify(data))
  if (pageNo === 1) {
    return dataCopy.splice(0, entriesPerPage)
  } else {
    const prevDataCount = (pageNo - 1) * entriesPerPage
    return dataCopy.splice(prevDataCount, entriesPerPage)
  }
}

export const removeItemFromLocalStorage = key => {
  if (
    localStorage.getItem(key) ||
    localStorage.getItem(key) === "" ||
    localStorage.getItem(key) === undefined ||
    localStorage.getItem(key) === null
  ) {
    localStorage.removeItem(key)
  }
}

export const viewCroppedTextTooltip = (text, textId, requiredLength = 12) => {
  if (text && text.length > requiredLength) {
    const shownText = text.slice(0, requiredLength)
    return (
      <Tooltip
        targetElt={<span id={textId}>{shownText}...</span>}
        target={textId}
        content={text}
      />
    )
  }
  return text
}

export const normalize = (arr = [], key = "id") => {
  return arr.reduce((acc, currentValue) => {
    acc[currentValue[key]] = currentValue
    return acc
  }, {})
}
