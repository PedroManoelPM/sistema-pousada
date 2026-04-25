import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Página Inicial", () => {
  it("deve exibir o título da pousada", () => {
    render(<Home />);
    const titulo = screen.getByText(/Bem-vindo à Pousada Pedra Furada/i);
    expect(titulo).toBeInTheDocument();
  });
});
