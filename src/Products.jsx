import { useEffect, useState } from "react";
import "./App.css";
import NoProducts from "./NoProducts";
import TableProducts from "./TableProducts";
import api from "./axiosApi";
import Loading from "./Loading";
import ModalConfirm from "./ModalConfirm";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(0);

  const loadProducts = () => {
    setLoading(true);
    api.get("obter_produtos")
      .then((response) => {
        console.log("Produtos carregados:", response.data); // Verificar os produtos retornados
        setProducts(response.data);
      })
      .catch((error) => console.error("Erro ao carregar produtos:", error))
      .finally(() => setLoading(false));
  };

  const loadCategories = () => {
    api.get("obter_categorias")
      .then((response) => {
        console.log("Categorias carregadas:", response.data); // Verificar as categorias retornadas
        const categorias = Array.isArray(response.data) ? response.data : [];
        setCategories(categorias);
      })
      .catch((error) => {
        console.error("Erro ao carregar categorias:", error);
        setCategories([]); // Garante que seja um array
      });
  };

  const deleteProduct = (productId) => {
    setLoading(true);
    api.post("excluir_produto", { id_produto: productId })
      .then((response) => {
        if (response.status === 204) loadProducts();
      })
      .catch((error) => console.error("Erro ao excluir produto:", error))
      .finally(() => setLoading(false));
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProductId(productId);
    const modal = new bootstrap.Modal(
      document.getElementById("modalDeleteProduct")
    );
    modal.show();
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoria_id === parseInt(selectedCategory))
    : products;

  return (
    <>
      {products.length > 0 ? (
        <>
          <ModalConfirm
            modalId="modalDeleteProduct"
            question="Deseja realmente excluir o produto?"
            confirmAction={() => deleteProduct(selectedProductId)}
          />
          <TableProducts
            items={filteredProducts}
            categories={categories}
            handleDeleteProduct={handleDeleteProduct}
            setSelectedCategory={setSelectedCategory}
          />
        </>
      ) : (
        !loading && <NoProducts />
      )}
      {loading && <Loading />}
    </>
  );
};

export default Products;
