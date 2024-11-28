import React, { useContext } from "react";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import { Col, Row } from "reactstrap";
import Button from "../../../components/Button/Button";
import { Plus } from "react-feather";
import TeamTable from "../../../components/TeamTable/TeamTable";
import { Link } from "react-router-dom";
import { IntlContext } from "../../../utility/context/Internationalization";
import "./index.scss";
const Teams = () => {
  const { locale } = useContext(IntlContext);
  const breadCrumbItems = [
    {
      linkLabel: "Teams",
      isActive: true
    }
  ];

  return (
    <div className="w-100">
      {/* Breadcrumb and Add Buttons */}
      <Row md={12} className="w-100">
        <BreadCrumb
          breadCrumbTitle={"Teams"}
          showBreadCrumb={true}
          breadCrumbItems={breadCrumbItems}
          breadCrumbClass={"bread_crumbs"}
          className="w-100"
        />
      </Row>
      <Row className="mb-3">
        <Col
          md={12}
          className="d-flex justify-content-between align-items-center"
        >
          {/* Breadcrumb Section */}
          <div />

          {/* Add Buttons Section */}
          <div className="d-flex ">
            {/* Add New Team Button */}
            <Link to={`/${locale}/Teams/add-team`}>
              <Button
                label={
                  <div className="d-flex align-items-center">
                    <Plus size={15} className="me-1" />
                    <span>Add New Team</span>
                  </div>
                }
                className="py-1 px-2 add_new_group_btn add-team-btn"
              />
            </Link>

            {/* Add New Member Button */}
            <Link to={`/${locale}/Teams/add-member`} className="mx-2">
              <Button
                label={
                  <div className="d-flex align-items-center">
                    <Plus size={15} className="me-1" />
                    <span>Add Member</span>
                  </div>
                }
                className="py-1 px-2 add_new_group_btn add-member-btn"
              />
            </Link>

            {/* Create New Member Button */}
            <Link to={`/${locale}/Teams/create-member`} className="mx-2 ">
              <Button
                label={
                  <div className="d-flex align-items-center">
                    <Plus size={15} className="me-1" />
                    <span>Create Member</span>
                  </div>
                }
                className="py-1 px-2 add_new_group_btn create-member-btn"
              />
            </Link>
          </div>
        </Col>
      </Row>

      {/* Table Section */}
      <Row>
        <Col md={12}>
          <TeamTable />
        </Col>
      </Row>
    </div>
  );
};

export default Teams;
