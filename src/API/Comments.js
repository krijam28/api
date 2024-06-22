// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CommentsComponent = () => {
//   const [newCommentBody, setNewCommentBody] = useState('');
//   const [newCommentName, setNewCommentName] = useState('');
//   const [newCommentEmail, setNewCommentEmail] = useState('');
//   const [editCommentName, setEditCommentName] = useState('');
//   const [editCommentEmail, setEditCommentEmail] = useState('');
//   const [editCommentBody, setEditCommentBody] = useState('');
//   const [editCommentId, setEditCommentId] = useState(null);
//   const [deleteCommentId, setDeleteCommentId] = useState(null);
//   const [comments,setComments] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedTab, setSelectedTab] = useState('Users');
//   //const [filteredComments, setFilteredComments] = useState([]);

//   useEffect(() => {
//     fetchComments();
//   }, []);
//   const fetchComments = async () => {
//     try {
//       const response = await axios.get('http://localhost:5002/comments');
//       return response.data;
     
//     } catch (error) {
//       console.error('Error fetching photos: ', error);
//       return [];
//     }
//   };
//   {/*delete comment */}
// const handleDeleteComment = (comment) => {
//   setDeleteCommentId(comment.id);
// };

// const confirmDeleteComment = async () => {
//   try {
//     await axios.delete(`http://localhost:5002/comments/${deleteCommentId}`);
    
//     // Filter out the deleted post from the posts state
//     const updatedComments = comments.filter(comment => comment.id !== deleteCommentId);
//     setComments(updatedComments);
//     handleSnackbar('Comment Deleted Successfully');
//   } catch (error) {
//     console.error('Error deleting comment:', error);
//   }
// };
// {/*add comments */}
// const handleCommentSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axios.post('http://localhost:5002/comments',{
//       name: newCommentName,
//       email: newCommentBody,
//       body: newCommentBody,
      

//       // Optionally, you can add userId if required
//     });

//     // Assuming your API returns the newly created post object, you can update your state accordingly
//     const newComment = response.data; // Assuming response.data is the newly created post object
//     setComments([...comments, newComment]); // Update posts state with the new post
//     handleSnackbar('Comment Created Successfully');
  

//     // Clear the input fields
//     setNewCommentName('');
//     setNewCommentEmail('');
//     setNewCommentBody('');
   

//     // Optionally, you can fetch updated data from the server again if needed
//     // Example: refetchPosts();
//   } catch (error) {
//     console.error('Error adding comment:', error);
//   }
// };
// {/*edit comment*/}
// const handleEditComment = (comment) => {
//   setEditCommentId(comment.id);
//   setEditCommentName(comment.name);
//   setEditCommentEmail(comment.email);
//   setEditCommentBody(comment.body);
// };

// const handleUpdateComment = async (e) => {
//   e.preventDefault();

//   try {
//     const response = await axios.put(`http://localhost:5002/comments/${editCommentId}`, {
//       name: editCommentName,
//       email: editCommentEmail,
//       body: editCommentBody,
     
//     });

//     const updatedComment = response.data;

//     // Update the posts state with the updated post
//     const updatedComments = comments.map(comment =>
//       comment.id === updatedComment.id ? updatedComment : comment
//     );
//     setComments(updatedComments);
//     handleSnackbar('Comment Updated Successfully');
   
//   } catch (error) {
//     console.error('Error updating comment:', error);
//   }
// };
// const handleSnackbar = (message) => {
//   // Implement your snackbar handling logic here
//   console.log(message);
// };

// // const commentsData = await fetchComments();
// //         setComments(commentsData);

//         const filteredComments = comments.filter(comment =>
//           comment.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
      
       
//         const getInitials = (name) => {
//           const initials = name.match(/\b\w/g) || [];
//           return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
//         };

//         return (
//           <>
//           {selectedTab === 'Comments' && (
//           <>
//           <nav className="navbar">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="#">
         
//         <i class="bi bi-chat-heart bi-mx-auto p-2"></i> {" "}{" "}Comments
//         </a>
//         <form className="d-flex" role="search">
//           <input className="form-control me-2" value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
//           <button  type="button" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#commentModal" data-bs-whatever="@mdo">CreateComment</button>
//         </form>
//       </div>
//     </nav>
//           <div className="box-container">
//             {filteredComments.map(comment => (
//               <div key={comment.id} className="post">
//                 <ol class="list-group">      
//   <li class="list-group-item d-flex justify-content-between align-items-start">
//   <div className="user-info">
//     <div className="user-initials">{getInitials(comment.name)}</div>
//     <h3 className="user-name" >{comment.name}</h3>
//     </div>
//     <div class="btn-group" role="group" aria-label="Basic example">
  
//   <button type="button" class="btn btn-light"  onClick={() => handleEditComment(comment)}  data-bs-toggle="modal" data-bs-target="#editcommentModal"><i className="bi bi-pencil-square"></i></button>
//   <button type="button" class="btn btn-light"  onClick={() => handleDeleteComment(comment)} data-bs-toggle="modal" data-bs-target="#deletecommentModal"><i className="bi bi-trash"></i></button>
// </div>          
//   </li>  
// </ol> 
// <br/>
// <p>{comment.email}</p>
//                 <p>{comment.body}</p>          
//               </div>
//             ))}
//           </div>
//           </>
//         )}
//         {/* Add comment Modal */}
// <div className="modal fade" id="commentModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div className="modal-dialog">
//       <div className="modal-content">
//         <div className="modal-header">
//           <h1 className="modal-title fs-5" id="exampleModalLabel">Add Post</h1>
//           <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//         </div>
//         <div className="modal-body">
//           <form onSubmit={handleCommentSubmit}>
//             <div className="mb-3">
//               <label htmlFor="post-title" className="col-form-label">Name:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="post-title"
//                 value={newCommentName}
//                 onChange={(e) => setNewCommentName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="post-title" className="col-form-label">Email:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="post-title"
//                 value={newCommentEmail}
//                 onChange={(e) => setNewCommentEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="post-title" className="col-form-label">Body:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="post-title"
//                 value={newCommentBody}
//                 onChange={(e) => setNewCommentBody(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="modal-footer">
//             <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
//                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   </div>

// {/* Edit comment Modal */}
// <div className="modal fade" id="editcommentModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
//   <div className="modal-dialog">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h1 className="modal-title fs-5" id="editModalLabel">Edit Comment</h1>
//         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div className="modal-body">
//         <form onSubmit={handleUpdateComment}>
//           <div className="mb-3">
//             <label htmlFor="edit-post-name" className="col-form-label">Name:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="edit-post-name"
//               value={editCommentName}
//               onChange={(e) => setEditCommentName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="edit-post-body" className="col-form-label">Email:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="edit-post-title"
//               value={editCommentEmail}
//               onChange={(e) => setEditCommentEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="edit-post-body" className="col-form-label">Body:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="edit-post-title"
//               value={editCommentBody}
//               onChange={(e) => setEditCommentBody(e.target.value)}
//               required
//             />
//           </div>
//           <div className="modal-footer">
//             <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
//             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   </div>
// </div>

//   {/*delete comment modal*/}
// <div className="modal fade" id="deletecommentModal" tabIndex="-1" aria-labelledby="deleteModalLabelphoto" aria-hidden="true">
//   <div className="modal-dialog">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h1 className="modal-title fs-5" id="deleteModalLabelphoto">Confirm Deletion</h1>
//         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//       </div>
//       <div className="modal-body">
//         <p>Are you sure you want to delete this Comment?</p>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDeleteComment}>Yes</button>
//         <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
//       </div>
//     </div>
//   </div>
// </div>
// </>
//   );
// };

// export default CommentsComponent;

import axios from 'axios';

const fetchComments = async () => {
  try {
    const response = await axios.get('http://localhost:5002/comments');
    return response.data;
  } catch (error) {
    console.error('Error fetching comments: ', error);
    return [];
  }
};

export default fetchComments;