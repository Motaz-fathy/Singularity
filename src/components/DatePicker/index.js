import { Fragment, useState, useContext, useEffect } from "react"
import { Label } from "reactstrap"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/light.css"
import * as moment from "moment"
import { useSelector } from "react-redux"
import "./styles.scss"
import { IntlContext } from "../../utility/context/Internationalization"

const DatePicker = ({
  title,
  setFilteredParams,
  filteredParams,
  setPickerRef,
  name,
  dateRef,
  placeholder
}) => {
  const startDate = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
        .first_registered_provider_date
    : {}

  // const refComp = useRef(null)
  let startingDate = new Date(startDate).toLocaleDateString()
  let currentDate = new Date().toLocaleDateString()

  const [picker, setPicker] = useState("")
  const { messages, locale } = useContext(IntlContext)

  // useEffect(() => {
  //   setPickerRef(refComp)
  // }, [refComp])

  return (
    <Fragment>
      <Label for="range-picker">{title}</Label>
      <Flatpickr
        value={picker}
        ref={dateRef}
        id="range-picker"
        className="form-control picker"
        placeholder={placeholder||messages.SERVICE_PROVIDER.STORE_DATE_OF_REG_PLACEHOLDER}
        onChange={(date, dateStr) => {
          let from = moment(date[0]).format("l")
          let to = moment(date[1]).format("l")
          setFilteredParams({
            ...filteredParams,
            [name]: `${from}, ${to}`
          })
          setPicker(date)
        }}
        options={{
          mode: "range",
          defaultDate: picker
        }}
      />
    </Fragment>
  )
}

export default DatePicker
