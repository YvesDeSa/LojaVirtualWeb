import { useState, useEffect } from "react";

const CategoryForm = ({ saveCategory, selectedCategory, clearSelection }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      setName(selectedCategory.nome);
    } else {
      setName("");
    }
  }, [selectedCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("O nome da categoria é obrigatório.");
      return;
    }
    saveCategory({ id: selectedCategory?.id, nome: name.trim() });
    setName("");
    clearSelection();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label">
          Nome da Categoria
        </label>
        <input
          type="text"
          id="categoryName"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {selectedCategory ? "Atualizar" : "Adicionar"}
      </button>
      {selectedCategory && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={clearSelection}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};

export default CategoryForm;
