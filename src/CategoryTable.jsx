const CategoryTable = ({ categories, setSelectedCategory, deleteCategory, loading }) => {
    if (loading) {
      return <p>Carregando...</p>;
    }
  
    if (!categories.length) {
      return <p>Nenhuma categoria encontrada.</p>;
    }
  
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.nome}</td>
              <td>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteCategory(category)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CategoryTable;
  