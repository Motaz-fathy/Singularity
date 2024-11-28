import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Table as ReactstrapTable } from "reactstrap";
import ReactPaginate from "react-paginate";
import NoDataFound from "../NoDataFound/NoDataFound";
import "./Table.scss";
import { IntlContext } from "../../utility/context/Internationalization";

const Table = ({
  columns,
  data,
  renderRow,
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
                {columns.map((elt, i) => {
                  return (
                    <th key={i} className="rdt_TableCol">
                      {elt}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((elt, i) => {
                return (
                  <tr key={i} className="rdt_TableRow">
                    {renderRow(elt)}
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

export default Table;

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.element])
  ).isRequired,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
