import { useEffect, useState } from "react";
import CategoryTable from "./CategoryTable";
import CategoryForm from "./CategoryForm";
import ModalConfirm from "./ModalConfirm";
import api from "./axiosApi";

const Categories = () => {
  const [categories, setCategories] = useState([]); // Lista de categorias
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const [selectedCategory, setSelectedCategory] = useState(null); // Categoria selecionada para edição
  const [categoryToDelete, setCategoryToDelete] = useState(null); // Categoria selecionada para exclusão
  const [modalVisible, setModalVisible] = useState(false); // Controle de exibição do modal de exclusão

  // Carregar categorias
  const loadCategories = () => {
    setLoading(true);
    api.get("obter_categorias")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Erro ao carregar categorias:", error))
      .finally(() => setLoading(false));
  };

  const deleteCategory = (id) => {
    api.post(`excluir_categoria/${id}`)
      .then(() => loadCategories()) 
      .catch((error) => console.error("Erro ao excluir categoria:", error))
      .finally(() => {
        setModalVisible(false); 
        setCategoryToDelete(null); 
      });
  };
  
  const saveCategory = (category) => {
    const endpoint = category.id ? "editar_categoria" : "adicionar_categoria";
    api.post(endpoint, category)
      .then(() => loadCategories())
      .catch((error) => console.error("Erro ao salvar categoria:", error));
  };

  const handleDeleteCategory = (categoryId) => {
    setCategoryToDelete(categoryId.id);
    const modalElement = document.getElementById("modalDeleteCategory");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error("Modal não encontrado no DOM.");
    }
  };
  
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container">
      <h1>Gerenciar Categorias</h1>
      <CategoryForm
        saveCategory={saveCategory}
        selectedCategory={selectedCategory}
        clearSelection={() => setSelectedCategory(null)}
      />
      <CategoryTable
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        handleDeleteCategory={handleDeleteCategory}
        loading={loading}
      />
      
      <ModalConfirm
        modalId="modalDeleteCategory"
        question="Deseja realmente excluir a Categoria?"
        confirmAction={() => deleteCategory(categoryToDelete)}
      />

    </div>
  );
};

export default Categories;
