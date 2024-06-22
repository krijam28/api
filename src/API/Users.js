// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UsersComponent = () => {
//   const [users, setUsers] = useState([]);
//   const [deleteUserId, setDeleteUserId] = useState(null);
//   const [newUserName, setNewUserName] = useState('');
//   const [newUserEmail, setNewUserEmail] = useState('');
//   const [newUserPhone, setNewUserPhone] = useState('');
//   const [editUserId, setEditUserId] = useState(null);
//   const [editUserName, setEditUserName] = useState('');
//   const [editUserEmail, setEditUserEmail] = useState('');
//   const [editUserPhone, setEditUserPhone] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTab, setSelectedTab] = useState('Users');

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleDeleteUser = (user) => {
//     setDeleteUserId(user.id);
//   };

//   const confirmDeleteUser = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/users/${deleteUserId}`);
//       const updatedUsers = users.filter(user => user.id !== deleteUserId);
//       setUsers(updatedUsers);
//       handleSnackbar('User Deleted Successfully');
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handleUserSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/users', {
//         name: newUserName,
//         email: newUserEmail,
//         phone: newUserPhone,
//       });

//       const newUser = response.data;
//       setUsers([...users, newUser]);
//       handleSnackbar('User Created Successfully');

//       setNewUserName('');
//       setNewUserEmail('');
//       setNewUserPhone('');
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };

//   const handleEditUser = (user) => {
//     setEditUserId(user.id);
//     setEditUserName(user.name);
//     setEditUserEmail(user.email);
//     setEditUserPhone(user.phone);
//   };

//   const handleUpdateUser = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.put(`http://localhost:5000/users/${editUserId}`, {
//         name: editUserName,
//         email: editUserEmail,
//         phone: editUserPhone,
//       });

//       const updatedUser = response.data;
//       const updatedUsers = users.map(user =>
//         user.id === updatedUser.id ? updatedUser : user
//       );
//       setUsers(updatedUsers);
//       handleSnackbar('User Updated Successfully');
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleSnackbar = (message) => {
//     // Implement your snackbar handling logic here
//     console.log(message);
//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

 
//   const getInitials = (name) => {
//     const initials = name.match(/\b\w/g) || [];
//     return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
//   };

//   return (
//     <>
//       {selectedTab === 'Users' && (
//         <>
//           <nav className="navbar">
//             <div className="container-fluid">
//               <a className="navbar-brand" href="#">
//                 <i className="bi bi-people bi-mx-auto p-2"></i> Users
//               </a>
//               <form className="d-flex" role="search">
//                 <input
//                   className="form-control me-2"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                 />
//                 <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#userModal" data-bs-whatever="@mdo">
//                   CreateUser
//                 </button>
//               </form>
//             </div>
//           </nav>

//           <div className="box-container">
//             {filteredUsers.map(user => (
//               <div key={user.id} className="post">
//                 <ol className="list-group">
//                   <li className="list-group-item d-flex justify-content-between align-items-start">
//                     <div className="user-info">
//                       <div className="user-initials">{getInitials(user.name)}</div>
//                       <h3 className="user-name">{user.name}</h3>
//                     </div>
//                     <div className="btn-group" role="group" aria-label="Basic example">
//                       <button type="button" className="btn btn-light" onClick={() => handleEditUser(user)} data-bs-toggle="modal" data-bs-target="#edituserModal">
//                         <i className="bi bi-pencil-square"></i>
//                       </button>
//                       <button type="button" className="btn btn-light" onClick={() => handleDeleteUser(user)} data-bs-toggle="modal" data-bs-target="#deleteuserModal">
//                         <i className="bi bi-trash"></i>
//                       </button>
//                     </div>
//                   </li>
//                 </ol>
//                 <br />
//                 <p className='user-email'><i className="bi bi-envelope-at-fill"></i> {user.email}</p>
//                 <p><i className="bi bi-telephone-fill"></i> {user.phone}</p>
//               </div>
//             ))}
//           </div>
//         </>
//       )}

//       {/* Add User Modal */}
//       <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">Add User</h1>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleUserSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="user-name" className="col-form-label">Name:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="user-name"
//                     value={newUserName}
//                     onChange={(e) => setNewUserName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="user-email" className="col-form-label">Email:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="user-email"
//                     value={newUserEmail}
//                     onChange={(e) => setNewUserEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="user-phone" className="col-form-label">Phone:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="user-phone"
//                     value={newUserPhone}
//                     onChange={(e) => setNewUserPhone(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="modal-footer">
//                   <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
//                   <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>  
//         </div>
//       </div>
// {/*delete user modal*/}
// <div className="modal fade" id="deleteuserModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
//   <div className="modal-dialog">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h1 className="modal-title fs-5" id="deleteModalLabeluser">Confirm Deletion</h1>
//         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div className="modal-body">
//         <p>Are you sure you want to delete this User?</p>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDeleteUser}>Yes</button>
//         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
//       </div>
//     </div>
//   </div>
// </div>
//       {/* Edit User Modal */}
//       <div className="modal fade" id="edituserModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="editModalLabel">Edit User</h1>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={handleUpdateUser}>
//                 <div className="mb-3">
//                   <label htmlFor="edit-user-name" className="col-form-label">Name:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="edit-user-name"
//                     value={editUserName}
//                     onChange={(e) => setEditUserName(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="edit-user-email" className="col-form-label">Email:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="edit-user-email"
//                     value={editUserEmail}
//                     onChange={(e) => setEditUserEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="edit-user-phone" className="col-form-label">Phone:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="edit-user-phone"
//                     value={editUserPhone}
//                     onChange={(e) => setEditUserPhone(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="modal-footer">
//                   <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
//                   <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UsersComponent;


import axios from 'axios';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users: ', error);
    return [];
  }
};

export default fetchUsers;