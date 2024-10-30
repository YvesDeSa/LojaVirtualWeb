import React from "react";
import TableOrdersLine from "./TableOrdersLine";

const TableOrders = ({items, handleCancelOrder, handleEvolveOrder}) => {

  return (

        <table className="table table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Data/Hora</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
                {items.map(o => <TableOrdersLine item={o} key={o.id} handleCancelOrder={handleCancelOrder} handleEvolveOrder={handleEvolveOrder} />)}
            </tbody>
        </table> 

  )
}

export default TableOrders;
