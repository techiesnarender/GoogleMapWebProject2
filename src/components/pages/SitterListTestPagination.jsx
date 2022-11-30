import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import Pagination from '@mui/material/Pagination'; 
import UserServices from "../../services/UserServices";
import { Typography } from "@mui/material";

const SitterListTestPagination = (props) => {
    const [users, setUsers] = useState([]);

    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(6);

  const pageSizes = [6, 9];

  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };
  
    const retrieveTutorials = () => {
      const params = getRequestParams(page, pageSize);

      UserServices.getPaginationAll(params)
        .then((response) => {
          const { user, totalPages } = response.data;

          setUsers(user);
          setCount(totalPages);
  
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    useEffect(retrieveTutorials, [page, pageSize]);

    const handlePageChange = (event, value) => {
      setPage(value);
    };
  
    const handlePageSizeChange = (event) => {
      setPageSize(event.target.value);
      setPage(1);
    };

    const columns = useMemo(
        () => [
          {
            Header: "Contact Name",
            accessor: "contactname",
          },
          {
            Header: "Company Name",
            accessor: "company",
          },
          {
            Header: "Email",
            accessor: "email",
          },
          {
            Header: "Address",
            accessor: "address",
          },
          {
            Header: "Open Time",
            accessor: "open",
          },
          {
            Header: "Charges",
            accessor: "chargesperhour",
          },
        ],
        []
      );
    
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({
        columns,
        data: users,
      });

    return (
        <>
          <div className="mt-3 mb-3">
            {"Items per Page: "}
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select> 
          </div>
              
          <table
            className="table table-striped table-bordered"
            {...getTableProps()}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table> 
          
          <Typography>Page: {page}</Typography>
          <div style={{paddingLeft:"41%"}}>
              <Pagination 
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                color="secondary"
                onChange={handlePageChange}
                showFirstButton showLastButton
              />
          </div>
      </>
      );
    };
    

    export default SitterListTestPagination;