import { IconPlus } from '@tabler/icons-react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { data } from '../../../components/constants/data';

// Función para crear columnas de DataTable
const createColumns = (keys) => keys.map(key => ({
  name: key,
  selector: row => row[key.toLowerCase()],
  sortable: true
}));

// Configuración común para las DataTables
const dataTableConfig = {
  pagination: true,
  paginationPerPage: 5,
  selectableRows: true,
  onSelectedRowsChange: (state) => console.log(state.selectedRows)
};

export default function Dashboard() {
  const columns = createColumns(['ID', 'Name', 'Price', 'Category', 'Descriptio']);
  const columns_2 = createColumns(['ID', 'Name']);
  const columns_3 = createColumns(['ID', 'Name', 'Price']);

  return (
    <main className='flex flex-col w-full px-10'>
      <div className='flex justify-between items-center'>
        <h1 className="text-3xl font-bold my-8">Dashboard</h1>
        <Link to='/admin/add-product'  className='px-6 py-3 bg-primary-500 rounded-2xl text-xl text-white hover:bg-primary-600 flex items-center justify-between gap-4'>
          <IconPlus className='size-8'/>
          Argegar
        </Link>
      </div>
      <section className='flex flex-col lg:grid grid-cols-3 grid-rows-2 gap-8'>
        <div className='row-span-1 col-span-3'>
          <DataTable
            title='Productos'
            columns={columns} 
            data={data} 
            {...dataTableConfig}
          />
        </div>
        <div className='col-span-1'>
          <DataTable
            title='Categorías'
            columns={columns_2} 
            data={data} 
            {...dataTableConfig}
          />
        </div>
        <div className='col-span-2'>
          <DataTable
            title='Extras'
            columns={columns_3} 
            data={data} 
            {...dataTableConfig}
          />
        </div>
      </section>
    </main>
  );
}
