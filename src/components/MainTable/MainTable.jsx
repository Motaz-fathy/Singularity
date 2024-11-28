import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Table as ReactstrapTable } from "reactstrap";
import ReactPaginate from "react-paginate";
import NoDataFound from "../NoDataFound/NoDataFound";
import "./MainTable.scss";
import { IntlContext } from "../../utility/context/Internationalization";

const MainTable = ({
  columns,
  data,
  currentPage,
  setCurrentPage,
  totalRecords,
}) => {
  const { messages, locale } = useContext(IntlContext);
  return (
    <>
      {data?.length ? (
        <div>
          <ReactstrapTable responsive className="rdt_Table">
            <thead className="rdt_TableHeadRow">
              <tr>
                {columns.map(({ title }, i) => {
                  return (
                    <th key={i} className="rdt_TableCol">
                      {title}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => {
                return (
                  <tr key={i} className="rdt_TableRow">
                    {columns.map(({ key, render, classes }, idx) => {
                      const cell = row[key];
                      return (
                        <td
                          className={`rdt_TableCell ${classes || ""}`}
                          key={idx}
                        >
                          {render?.(cell, row) || cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </ReactstrapTable>
          <div className="table_footer d-flex justify-content-between align-items-center">
            <div>
              {messages.GENERAL.SHOWING}{" "}
              {currentPage * 10 > totalRecords
                ? totalRecords
                : currentPage * 10}{" "}
              {messages.GENERAL.OF} {totalRecords}
            </div>
            <ReactPaginate
              previousLabel={""}
              nextLabel={""}
              forcePage={currentPage - 1}
              onPageChange={(page) => setCurrentPage(page.selected + 1)}
              pageCount={totalRecords / 10 || 1}
              breakLabel={"..."}
              pageRangeDisplayed={2}
              marginPagesDisplayed={2}
              activeClassName="active"
              pageClassName={`page-item ${
                totalRecords <= 11 ? "single_item" : ""
              }`}
              nextLinkClassName="page-link"
              nextClassName="page-item next"
              previousClassName="page-item prev"
              previousLinkClassName="page-link"
              pageLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
            />
          </div>
        </div>
      ) : (
        <NoDataFound />
      )}
    </>
  );
};

export default MainTable;

MainTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      classes: PropTypes.string,
      render: PropTypes.func,
    })
  ),
  data: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
