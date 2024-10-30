import { useEffect, useState } from 'react';
import './App.css';
import api from './axiosApi';
import Loading from './Loading';
import ModalConfirm from './ModalConfirm';
import NoUsers from './NoUsers';
import TableUsers from './TableUsers';

const Users = () => {
 
  const [users, setUsers] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(0);

  
  const loadUsers = () => {
    
    setLoading(true);
    const usersEndpoint = "obter_users";
    api.get(usersEndpoint).then((response) => {setUsers(response.data)}).catch((error) => {console.log(error)}).finally(() => {setLoading(false)});

    setUsers(users)
    console.log(users)
    setLoading(false)
  }


  const deleteUser = (userId) => {
    setLoading(true);
    api.post("excluir_user", {"id_user": userId}).then((response) => { if(response.status === 204) loadUsers()}).catch((error) => {console.error("Erro ao excluir usuário:", error)}).finally(() => {setLoading(false)});
  }

  const handleDeleteUser = (userId) => {
    setSelectedUserId(userId);
    const modal = new bootstrap.Modal(document.getElementById('modalDeleteUser'));
    modal.show();
  }

  useEffect(() => {loadUsers()},[]);

  
  return (
    <>
      {users.length > 0 ? 
      <>
      <ModalConfirm modalId="modalDeleteUser" question="Deseja realmente excluir o usuário?" confirmAction={()=> deleteUser(selectedUserId)} />
      <TableUsers items={users} handleDeleteUser={handleDeleteUser} />
      </> :
      ( !loading && <NoUsers />)
      }
      {loading && <Loading />}
      </>
  );
}
export default Users;