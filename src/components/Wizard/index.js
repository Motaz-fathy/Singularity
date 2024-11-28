// ** React Imports
import { useEffect, useState, Fragment, forwardRef, useContext } from "react";

// ** Third Party Components
import Stepper from "bs-stepper";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import { ChevronRight } from "react-feather";
import { Button } from "reactstrap";
import { IntlContext } from "../../utility/context/Internationalization";
import qs from "query-string";

// ** Styles
import "bs-stepper/dist/css/bs-stepper.min.css";
import "./styles.scss";
import { Link, useHistory } from "react-router-dom";

const Wizard = forwardRef((props, ref) => {
  // ** Props
  const {
    type,
    className,
    steps,
    separator,
    options,
    instance,
    isSelector,
    viewMode,
    editMode,
  } = props;

  // ** State
  const [activeIndex, setActiveIndex] = useState(0);
  const { messages, locale } = useContext(IntlContext);
  const history = useHistory();
  let userId =
    history.location.search !== "" &&
    history.location.search.split("&")[1].split("=")[1];

  // ** Vars
  let stepper = null;

  // ** Step change listener on mount
  useEffect(() => {
    stepper = new Stepper(ref.current, options);

    ref.current.addEventListener("shown.bs-stepper", function (event) {
      setActiveIndex(event.detail.indexStep);
    });

    if (instance) {
      instance(stepper);
    }
  }, []);

  // ** Renders Wizard Header
  const renderHeader = () => {
    return steps.map((step, index) => {
      return (
        <Fragment key={step.id}>
          {/* {options.isSelector || (index !== 0 && index !== steps.length) ? (
            <div className="line">{separator}</div>
          ) : null} */}
          <div
            className={classnames("step", {
              crossed: activeIndex > index,
              active: index === activeIndex,
            })}
            data-target={`#${step.id}`}
          >
            <button
              type="button"
              className="step-trigger"
              disabled={index !== activeIndex && !viewMode}
            >
              <span className="bs-stepper-box">
                {step.icon ? step.icon : index + 1}
              </span>
              <span className="bs-stepper-label">
                <span className="bs-stepper-title">{step.title}</span>
              </span>
            </button>
          </div>
        </Fragment>
      );
    });
  };

  // ** Renders Wizard Content
  const renderContent = () => {
    return steps.map((step, index) => {
      return (
        <div
          className={classnames("content", {
            "active dstepper-block": activeIndex === index,
          })}
          id={step.id}
          key={step.id}
        >
          {step.content}
        </div>
      );
    });
  };

  return (
    <div
      ref={ref}
      className={classnames("bs-stepper", {
        [className]: className,
        vertical: type === "vertical",
        "vertical wizard-modern": type === "modern-vertical",
        "wizard-modern": type === "modern-horizontal",
      })}
    >
      <div className="bs-stepper-header">
        <>{renderHeader()}</>

        <div className="bs-right">
          {viewMode ? (
            <Link
              to={{
                pathname: `/${locale}/service_provider/multi`,
                search: qs.stringify({
                  editMode: true,
                  id: userId,
                  viewMode: false,
                }),
              }}
            >
              <button type="button" className="btn-edit">
                {messages.BUTTONS.EDIT}
              </button>
            </Link>
          ) : null}
        </div>
      </div>
      <div className="bs-stepper-content">{renderContent()}</div>
    </div>
  );
});

export default Wizard;

// ** Default Props
Wizard.defaultProps = {
  type: "horizontal",
  separator: <ChevronRight size={17} />,
  options: {},
};

// ** PropTypes
Wizard.propTypes = {
  type: PropTypes.string,
  instance: PropTypes.func,
  options: PropTypes.object,
  className: PropTypes.string,
  separator: PropTypes.element,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.any,
      content: PropTypes.any.isRequired,
    })
  ).isRequired,
};
