import React, { useContext } from "react";
import { AlertCircle } from "react-feather";
import { IntlContext } from "../../utility/context/Internationalization";

const PasswordRules = () => {
  const { messages } = useContext(IntlContext);
  const passwordRules = [
    messages.RESET_PASSWORD_PAGE.PASSWORD_AT_LEAST_1_NUMBER,
    messages.RESET_PASSWORD_PAGE.PASSWORD_AT_LEAST_1_UPPER_CASE_LETTER,
    messages.RESET_PASSWORD_PAGE.PASSWORD_AT_LEAST_1_LOWER_CASE_LETTER,
    messages.RESET_PASSWORD_PAGE.PASSWORD_AT_LEAST_1_SPECIAL_CHAR,
  ];
  return (
    <ul className="password_help_tip p-0 mt-2">
      <h6 className="f_size_12 bold">
        <AlertCircle className="mr-25" size={12} />
        <span>{messages.RESET_PASSWORD_PAGE.PASSWORD_RULES}</span>
      </h6>
      {passwordRules.map((rule, i) => (
        <li className={"f_size_12 mx-2"} key={i}>
          {rule}
        </li>
      ))}
    </ul>
  );
};

export default PasswordRules;
