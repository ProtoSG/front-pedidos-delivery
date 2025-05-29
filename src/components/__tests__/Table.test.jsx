import { render, screen } from "@testing-library/react";
import Table from "../Table";

// Mock api.js para evitar errores con import.meta.env en tests
jest.mock('../../constants/api');

// Mock react-data-table-component para aislar el test
jest.mock("react-data-table-component", () => (props) => (
  <div data-testid="data-table-mock">
    <div>Title: {props.title}</div>
    <div>Columns: {JSON.stringify(props.columns)}</div>
    <div>Data: {JSON.stringify(props.data)}</div>
    <div>Pagination: {props.pagination ? "true" : "false"}</div>
    <div>PaginationPerPage: {props.paginationPerPage}</div>
    <div>SelectableRows: {props.selectableRows ? "true" : "false"}</div>
  </div>
));

describe("Table component", () => {
  const columnsMock = [
    { name: "Nombre", selector: row => row.nombre, sortable: true },
    { name: "Edad", selector: row => row.edad, sortable: true }
  ];
  const dataMock = [
    { id: 1, nombre: "Juan", edad: 30 },
    { id: 2, nombre: "Ana", edad: 25 }
  ];
  const titleMock = "Usuarios";

  it("renders DataTable with correct props", () => {
    render(
      <Table
        title={titleMock}
        columns={columnsMock}
        data={dataMock}
      />
    );
    const dataTable = screen.getByTestId("data-table-mock");
    expect(dataTable).toBeInTheDocument();
    expect(dataTable).toHaveTextContent("Title: Usuarios");
    expect(dataTable).toHaveTextContent("Nombre");
    expect(dataTable).toHaveTextContent("Edad");
    expect(dataTable).toHaveTextContent("Juan");
    expect(dataTable).toHaveTextContent("Ana");
    expect(dataTable).toHaveTextContent("Pagination: true");
    expect(dataTable).toHaveTextContent("PaginationPerPage: 5");
    expect(dataTable).toHaveTextContent("SelectableRows: true");
  });
});