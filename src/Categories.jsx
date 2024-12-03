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
    api.post(`excluir_categoria/${id}`) // Envia o ID na URL
      .then(() => loadCategories()) // Atualiza as categorias após excluir
      .catch((error) => console.error("Erro ao excluir categoria:", error))
      .finally(() => {
        setModalVisible(false); // Fecha o modal após a exclusão
        setCategoryToDelete(null); // Limpa a categoria selecionada para exclusão
      });
  };
  

  // Salvar (adicionar ou editar) categoria
  const saveCategory = (category) => {
    const endpoint = category.id ? "editar_categoria" : "adicionar_categoria";
    api.post(endpoint, category)
      .then(() => loadCategories())
      .catch((error) => console.error("Erro ao salvar categoria:", error));
  };

  // Excluir categoria
  const handleDeleteCategory = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id); // Chama a função de exclusão com o ID
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container">
      <h1>Gerenciar Categorias</h1>
      {/* Formulário para adicionar/editar categoria */}
      <CategoryForm
        saveCategory={saveCategory}
        selectedCategory={selectedCategory}
        clearSelection={() => setSelectedCategory(null)}
      />
      {/* Tabela de categorias */}
      <CategoryTable
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        deleteCategory={(category) => {
          setCategoryToDelete(category); // Define a categoria para exclusão
          setModalVisible(true); // Mostra o modal de exclusão
        }}
        loading={loading}
      />
      {/* Modal de confirmação para exclusão */}
      {modalVisible && (
        <ModalConfirm
          modalId="modalDeleteCategory"
          question={`Deseja realmente excluir a categoria "${categoryToDelete?.nome}"?`}
          confirmAction={handleDeleteCategory} // Confirma exclusão
          cancelAction={() => {
            setModalVisible(false); // Fecha o modal sem excluir
            setCategoryToDelete(null); // Limpa a categoria selecionada para exclusão
          }}
        />
      )}
    </div>
  );
};

export default Categories;
