/* eslint-disable react/prop-types */
import DataTable from 'react-data-table-component';

export default function Table({title, columns, data}) {
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
  )
}
