import { Fragment, useEffect } from "react"
import { Label } from "reactstrap"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/light.css"

const PickerDateTime = ({ picker, setPicker, handleDateChange }) => {
  console.log(picker)
  return (
    <Fragment>
      {/* <Label for="date-time-picker">Date & Time</Label> */}
      <Flatpickr
        options={{
          minDate: "today"
        }}
        value={picker}
        data-enable-time
        id="date-time-picker"
        className="form-control picker"
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  )
}

export default PickerDateTime
