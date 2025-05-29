import { render, screen } from "@testing-library/react";
import Table from "../Table";

const columns = [
  { name: "Nombre", selector: (row) => row.nombre, sortable: true },
  { name: "Edad", selector: (row) => row.edad, sortable: true },
];

const data = [
  { id: 1, nombre: "Juan", edad: 30 },
  { id: 2, nombre: "Ana", edad: 25 },
];

describe("Table component", () => {
  it("muestra el mensaje de carga cuando loading es true", () => {
    render(
      <Table title="Usuarios" columns={columns} data={[]} loading={true} />,
    );
    expect(screen.getByText(/Cargando.../i)).toBeInTheDocument();
  });

  it("muestra el mensaje de error cuando error está presente", () => {
    render(
      <Table
        title="Usuarios"
        columns={columns}
        data={[]}
        error="Error de carga"
      />,
    );
    expect(screen.getByText(/Error de carga/i)).toBeInTheDocument();
  });

  it("muestra el título y los datos correctamente", () => {
    render(<Table title="Usuarios" columns={columns} data={data} />);
    expect(screen.getByText("Usuarios")).toBeInTheDocument();
    expect(screen.getByText("Juan")).toBeInTheDocument();
    expect(screen.getByText("Ana")).toBeInTheDocument();
  });

  it('muestra "No hay datos" cuando la data está vacía', () => {
    render(<Table title="Usuarios" columns={columns} data={[]} />);
    expect(screen.getByText("No hay datos")).toBeInTheDocument();
  });
});
