import { useEffect, useState } from 'react';
import './App.css';
import NoOrders from './NoOrders';
import TableOrders from './TableOrders';
import api from './axiosApi';
import ModalConfirm from './ModalConfirm';
import Loading from './Loading';


const Orders = () => {
 
  const [orders, setOrders] = useState([]);  
  const [orderState, setOrderState] = useState("pendente");
  const [selectedOrderId, setSelectedOrderId] = useState(0);
  const [loading, setLoading] = useState(true);
  

  const loadOrders = (state) => {
    setLoading(true);
    const ordersEndpoint = `obter_pedidos_por_estado/${state}`;
    api.get(ordersEndpoint).then((response) => {setOrders(response.data)}).catch((error) => {console.log(error)}).finally(() => {setLoading(false)})
  }

  const cancelOrder = (orderId) => {
    setLoading(true);
    api.post(`cancelar_pedido/${orderId}`).then((response) => { if(response.status === 204) loadOrders(orderState)}).catch((error) => {console.error("Erro ao cancelar pedido:", error)}).finally(() => {setLoading(false)});
  }


  const evolveOrder = (orderId) => {
    setLoading(true);
    api.post(`evoluir_pedido/${orderId}`).then((response) => { if(response.status === 204) loadOrders(orderState)}).catch((error) => {console.error("Erro ao evoluir pedido:", error)}).finally(() => {setLoading(false)});
  }

  const handleCancelOrder = (orderId) => {
    setSelectedOrderId(orderId);
    const modal = new bootstrap.Modal(document.getElementById('modalCancelOrder'));
    modal.show();
  }


  const handleEvolveOrder = (orderId) => {
    setSelectedOrderId(orderId);
    const modal = new bootstrap.Modal(document.getElementById('modalEvolveOrder'));
    modal.show();
  }




  useEffect(() => {loadOrders(orderState)},[orderState]);
//   const produtos = [
//     {id:1, nome:"Banana", preco:2.9, estoque:25},
//     {id:2, nome:"Morango", preco:4.9, estoque:31},
//     {id:3, nome:"Uva", preco:6.9, estoque:35},
//     {id:4, nome:"Pêssego", preco:5.9, estoque:21},
//     {id:5, nome:"Maçã", preco:3.9, estoque:18},
//     {id:6, nome:"Mamão", preco:7.9, estoque:13},
//     {id:7, nome:"Abacate", preco:1.9, estoque:17},
//   ];

// const handleModalCancelClick = () => {

// }
  
  return (
    <>
      <div className="form-floating my-3">
        <select id="orderState" value={orderState} onChange={(event) => setOrderState(event.target.value)} className='form-control'>
          <option value="carrinho">Carrinho</option>
          <option value="pendente">Pendente</option>
          <option value="pago">Pago</option>
          <option value="faturado">Faturado</option>
          <option value="separado">Separado</option>
          <option value="enviado">Enviado</option>
          <option value="entregue">Entregue</option>
          <option value="cancelado">Cancelado</option>
        </select>
        <label htmlFor="orderState" className='form-label'>Estado do Pedido:</label>
      </div>
    
        
        {orders.length > 0 ? 
        <>
          <ModalConfirm modalId="modalCancelOrder" question="Deseja realmente cancelar o pedido?" confirmAction={()=> cancelOrder(selectedOrderId)} />
          <ModalConfirm modalId="modalEvolveOrder" question="Deseja realmente evoluir o pedido?" confirmAction={()=> evolveOrder(selectedOrderId)} />    
          <TableOrders items={orders} handleCancelOrder={handleCancelOrder} handleEvolveOrder={handleEvolveOrder} />
        </>:  ( !loading && <NoOrders state={orderState} />)}
        {loading && <Loading />}
    </>
  )
}
export default Orders