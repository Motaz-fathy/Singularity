import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { BreadCrumb, Button } from "../../components/index";
import { IntlContext } from "../../utility/context/Internationalization";
import "./styles.scss";
import { requestServiceProvidersRegReq } from "../../redux/thunk/service_providers_requests";
import { useDispatch, useSelector } from "react-redux";
import AllRequestsHistoryTable from "../../components/ServiceProvider/AllRequestsHistoryTable/AllRequestsHistoryTable";
import AllRequestsHistoryFilters from "../../components/ServiceProvider/AllRequestsHistoryFilters/AllRequestsHistoryFilters";
import usePersistedState from "../../custom-hooks/usePersistedState";

const RequestsHistory = () => {
  const { messages, locale } = useContext(IntlContext);

  const [reqHistoryCurrentPage, setReqHistoryCurrentPage] = usePersistedState(
    "reqHistoryCurrentPage",
    1,
  );
  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setReqHistoryCurrentPage(page);
    dispatch(requestServiceProvidersRegReq({ page }));
  };

  const {
    service_providers_requests: { serviceProvidersRegReqList, serviceProvidersRegReqMetaData },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(requestServiceProvidersRegReq({ page: 1 }));
  }, []);

  // breadCrumbItems
  const breadCrumbItems = [
    { linkLabel: messages.SERVICE_PROVIDER.TITLE },
    {
      linkLabel: messages.SERVICE_PROVIDER.REQUEST_HISTORY,
      isActive: true,
    },
  ];

  //table
  const tableHeaders = [
    messages.SERVICE_PROVIDER.STORE_NAME,
    messages.SERVICE_PROVIDER.STORE_INFO,
    messages.SERVICE_PROVIDER.REQUEST_SERVICE_PROVIDER_NAME,
    messages.SERVICE_PROVIDER.REQUEST_TABLE_COMPLETION_STATUS,
    messages.SERVICE_PROVIDER.REQUEST_REG_DATE,

    messages.GENERAL.STATUS,

  ];

  return (
    <div className="all_request_page">
      <div className="header d-flex justify-content-between align-items-baseline flex-column flex-lg-row">
        <BreadCrumb
          breadCrumbTitle={messages.SERVICE_PROVIDER.REQUEST_HISTORY}
          showBreadCrumb={true}
          breadCrumbItems={breadCrumbItems}
          breadCrumbClass={"bread_crumbs"}
        />
      </div>
      <Card>
        <CardBody>
          <AllRequestsHistoryFilters setReqHistoryCurrentPage={setReqHistoryCurrentPage} />
          <AllRequestsHistoryTable
            serviceProvidersRegReqList={serviceProvidersRegReqList}
            metaData={serviceProvidersRegReqMetaData}
            tableHeaders={tableHeaders}
            isDeleteTable={true}
            handlePageChange={handlePageChange}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default RequestsHistory;
