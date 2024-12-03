import React from "react";

const TableProductsLine = ({ item, categories, handleDeleteProduct }) => {
  console.log(categories)
  console.log(item)
  const categoryName =
    categories.find((cat) => cat.id === item.categoria_id)?.nome || "Sem Categoria";

  return (
    <tr>
      <td>{item.id}</td>
      <td>{item.nome}</td>
      <td>{item.preco}</td>
      <td>{item.estoque}</td>
      <td>{categoryName}</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => handleDeleteProduct(item.id)}
        >
          Deletar
        </button>
      </td>
    </tr>
  );
};

export default TableProductsLine;
