import React from "react";
import TableProductsLine from "./TableProductsLine";

const TableProducts = ({
  items,
  categories,
  handleDeleteProduct,
  setSelectedCategory,
}) => {
  return (
    <div>
      <div className="mb-3">
        <label htmlFor="categoryFilter" className="form-label">
          Filtrar por Categoria:
        </label>
        <select
          id="categoryFilter"
          className="form-select"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {Array.isArray(categories) &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nome}
              </option>
            ))}
        </select>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <TableProductsLine
              item={p}
              key={p.id}
              categories={categories}
              handleDeleteProduct={handleDeleteProduct}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProducts;
