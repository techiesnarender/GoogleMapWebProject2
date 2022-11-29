import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTable } from "react-table";
import UserServices from "../../services/UserServices";

const SitterListTestPagination = (props) => {
    const [users, setTutorials] = useState([]);
    const tutorialsRef = useRef();
  
    tutorialsRef.current = users;
  
    useEffect(() => {
      retrieveTutorials();
    }, []);
  
    const retrieveTutorials = () => {
      UserServices.getPublicAll()
        .then((response) => {
          setTutorials(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const columns = useMemo(
        () => [
          {
            Header: "Contact Name",
            accessor: "contactname",
          },
          {
            Header: "Email",
            accessor: "email",
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
        <div className="list row">
        <div className="col-md-12 list">
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
        </div>
  
      </div>
      );
    };
    

    export default SitterListTestPagination;