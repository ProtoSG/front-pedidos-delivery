import PropTypes from "prop-types";
import DataTable from "react-data-table-component";

Table.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

export default function Table({ title, columns, data }) {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      pagination
      paginationPerPage={5}
      selectableRows
      onSelectedRowsChange={(state) => console.log(state.selectedRows)}
    />
  );
}
