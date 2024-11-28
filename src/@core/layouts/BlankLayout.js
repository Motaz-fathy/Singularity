// ** React Imports
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";
import Loader from "../../components/Loader/Loader";
import Snackbar from "../../components/Snackbar/Snackbar";
import { useHistory } from "react-router-dom";
import { setHistoryPath } from "../../redux/actions/general";

const BlankLayout = ({ children, ...rest }) => {
  const {
    loader,
    snackbar: { visible },
    historyPath,
  } = useSelector((state) => state.general);
  const history = useHistory();
  const dispatch = useDispatch();
  // ** Hooks
  const [skin, setSkin] = useSkin();

  // ** States
  const [isMounted, setIsMounted] = useState(false);

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  useEffect(() => {
    if (historyPath) {
      history.push(historyPath);
      dispatch(setHistoryPath(null));
    }
  }, [historyPath]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="blank-page">
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            {loader && <Loader />}
            {visible && <Snackbar />}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;
