import React, { useContext } from 'react'
import { IntlContext } from '../../../utility/context/Internationalization';
import {  Col, Row } from 'reactstrap';
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import { Plus } from 'react-feather';
import ProjectTeamTable from '../../../components/ProjectTeamTable/ProjectTeamTable';
import Button from '../../../components/Button/Button';

const ProjectsTeam = () => {
  const {locale } = useContext(IntlContext)
  const breadCrumbItems = [
    {
      linkLabel: "Project Team",
      isActive: true
    }
  ];

  return (
    <div className="w-100 d-flex-col ">
    {/* bredcramb and add button  */}
  <Row md={12} className={"d-flex justify-between align-items-center "}>
    <Col md={9}>
      <BreadCrumb
        breadCrumbTitle={"Project"}
        showBreadCrumb={true}
        breadCrumbItems={breadCrumbItems}
        breadCrumbClass={"bread_crumbs"}
      />
    </Col>

    <Col md={3} >
     <Link to={`/${locale}/Projects-Team/add-project`}>
     <Button
            label={
              <p className="mb-0 p-0">
                <Plus size={15} className="add_icon" />
                <span className="mx-50 f_size_12">
                 Add new project 
                </span>
              </p>
            }
            className="py-50 add_new_group_btn"
          />
     </Link>
    </Col>
  </Row>

  {/* table of team contains members  */}

  <Row md={12}>
    <Col md={12}>
    <ProjectTeamTable />
    </Col>
  </Row>

</div>
  )
}

export default ProjectsTeam