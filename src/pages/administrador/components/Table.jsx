/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";

export default function Table({ title, columns, data }) {
  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
      },
    },
  };

  const dataTableConfig = {
    pagination: true,
    paginationPerPage: 5,
    responsive: true,
    customStyles: customStyles,
  };

  return (
    <div className="flex flex-col justify-center text-lg">
      <DataTable
        title={title}
        columns={columns}
        data={data}
        noDataComponent="No hay datos"
        {...dataTableConfig}
      />
    </div>
  );
}
