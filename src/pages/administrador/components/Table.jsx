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
    fixedHeader: true,
    fixedHeaderScrollHeight: "70%",
  };

  return (
    <div className="w-full h-full text-lg p-3 rounded-3xl border-2 border-gray-400 bg-[#FFFFFF]">
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
