import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fetchPhotos from '../API/Photos';
import fetchTodos from '../API/Todos';
import fetchAlbums from '../API/Albums';
import fetchUsers from '../API/Users';
import fetchComments from '../API/Comments';
import '../styles/PostData.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MainApp = () => {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [todos,setTodos] = useState([]);
  const [albums,setAlbums]= useState([]);
  const [users,setUsers] = useState([]);
  const [comments,setComments] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Users');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostBody, setEditPostBody] = useState('');
  const [editPostId, setEditPostId] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserPhone, setEditUserPhone] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editPhotoTitle, setEditPhotoTitle] = useState('');
  const [editPhotoThumbnailUrl, setEditPhotoThumbnailUrl] = useState('');
  const [editPhotoId, setEditPhotoId] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deletePhotoId, setDeletePhotoId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoThumbnailUrl, setNewPhotoThumbnailUrl] = useState('');
  

const getInitials = (name) => {
    const initials = name.match(/\b\w/g) || [];
    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
  };

  

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setNewPhotoThumbnailUrl(reader.result); // Update state with the URL of the selected file
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  

  // Function to display success message and clear after a timeout
  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };
 
{/*delete post */}

const handleDeletePost = (post) => {
  setDeletePostId(post.id);
};

const confirmDelete = async () => {
  try {
    await axios.delete(`http://localhost:5001/posts/${deletePostId}`);
    
    // Filter out the deleted post from the posts state
    const updatedPosts = posts.filter(post => post.id !== deletePostId);
    setPosts(updatedPosts);
    handleSnackbar('Post Deleted Successfully');
  } catch (error) {
    console.error('Error deleting post:', error);
  }
};

{/*delete User */}

const handleDeleteUser = (user) => {
  setDeleteUserId(user.id);
};

const confirmDeleteUser = async () => {
  try {
    await axios.delete(`http://localhost:5000/users/${deleteUserId}`);
    
    // Filter out the deleted post from the posts state
    const updatedUsers = users.filter(user => user.id !== deleteUserId);
    setUsers(updatedUsers);
    handleSnackbar('User Deleted Successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

{/*delete photo */}
const handleDeletePhoto = (photo) => {
  setDeletePhotoId(photo.id);
};

const confirmDeletePhoto = async () => {
  try {
    await axios.delete(`http://localhost:5006/photos/${deletePhotoId}`);
    
    // Filter out the deleted post from the posts state
    const updatedPhotos = photos.filter(photo => photo.id !== deletePhotoId);
    setPhotos(updatedPhotos);
    handleSnackbar('Photo Deleted Successfully');
  } catch (error) {
    console.error('Error deleting photo:', error);
  }
};

{/*add post */}
  const handlePostSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5001/posts',{
        title: newPostTitle,
        body: newPostBody,
        // Optionally, you can add userId if required
      });
  
      // Assuming your API returns the newly created post object, you can update your state accordingly
      const newPost = response.data; // Assuming response.data is the newly created post object
      setPosts([...posts, newPost]); // Update posts state with the new post
      handleSnackbar('Post Created Successfully');
    
  
      // Clear the input fields
      setNewPostTitle('');
      setNewPostBody('');
  
      // Optionally, you can fetch updated data from the server again if needed
      // Example: refetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  

  {/*add user */}
  const handleUserSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/users',{
        name: newUserName,
        email: newUserEmail,
        phone: newUserPhone,
        

        // Optionally, you can add userId if required
      });
  
      // Assuming your API returns the newly created post object, you can update your state accordingly
      const newUser = response.data; // Assuming response.data is the newly created post object
      setUsers([...users, newUser]); // Update posts state with the new post
      handleSnackbar('User Created Successfully');
    
  
      // Clear the input fields
      setNewUserName('');
      setNewUserEmail('');
      setNewUserPhone('');
      // setNewUserZipcode('');
      // setNewUserCity('');
  
      // Optionally, you can fetch updated data from the server again if needed
      // Example: refetchPosts();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


{/*add photo */}
const handlePhotoSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5006/photos',{
      thumbnailUrl: newPhotoThumbnailUrl,
      title: newPhotoTitle,
      // Optionally, you can add userId if required
    });

    // Assuming your API returns the newly created post object, you can update your state accordingly
    const newPhoto = response.data; // Assuming response.data is the newly created post object
    setPhotos([...photos, newPhoto]); // Update posts state with the new post
    handleSnackbar('Photos Created Successfully');
  

    // Clear the input fields
    setNewPhotoThumbnailUrl('');
    setNewPhotoTitle('');
    

    // Optionally, you can fetch updated data from the server again if needed
    // Example: refetchPosts();
  } catch (error) {
    console.error('Error adding photo:', error);
  }
};


  {/*edit post*/}
  const handleEditPost = (post) => {
    setEditPostId(post.id);
    setEditPostTitle(post.title);
    setEditPostBody(post.body);
  };
  

  const handleUpdatePost = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:5001/posts/${editPostId}`, {
        title: editPostTitle,
        body: editPostBody,
      });
  
      const updatedPost = response.data;
  
      // Update the posts state with the updated post
      const updatedPosts = posts.map(post =>
        post.id === updatedPost.id ? updatedPost : post
      );
      setPosts(updatedPosts);
      handleSnackbar('Post Updated Successfully');
     
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  {/*edit user*/}
  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUserName(user.name);
    setEditUserEmail(user.email);
    setEditUserPhone(user.phone);
  };
  
  const handleUpdateUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:5000/users/${editUserId}`, {
        name: editUserName,
        email: editUserEmail,
        phone: editUserPhone,
       
      });
  
      const updatedUser = response.data;
  
      // Update the posts state with the updated post
      const updatedUsers = users.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      );
      setUsers(updatedUsers);
      handleSnackbar('User Updated Successfully');
     
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  {/*edit photo*/}
  const handleEditPhoto = (photo) => {
    setEditPhotoId(photo.id);
    setEditPhotoTitle(photo.title);
    setEditPhotoThumbnailUrl(photo.thumbnailUrl);
  };
  

  const handleUpdatePhoto = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`http://localhost:5006/photos/${editPhotoId}`, {
        title: editPhotoTitle,
        thumbnailUrl: editPhotoThumbnailUrl,
      });
  
      const updatedPhoto = response.data;
  
      // Update the posts state with the updated post
      const updatedPhotos = photos.map(photo =>
        photo.id === updatedPhoto.id ? updatedPhoto : photo
      );
      setPhotos(updatedPhotos);
      handleSnackbar('Photo Updated Successfully');
     
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };
  

{/*api caaling */}
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:5001/posts');
        setPosts(postsResponse.data);

        const photosData = await fetchPhotos();
        setPhotos(photosData);

        const todosData = await fetchTodos();
        setTodos(todosData);

        const albumsData = await fetchAlbums();
        setAlbums(albumsData);

        const usersData = await fetchUsers();
        setUsers(usersData);

        const commentsData = await fetchComments();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  {/*filter search post */}
    useEffect(() => {
    const filteredUsers = users.filter(user =>
       user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredUsers);

    const filteredPosts = posts.filter(post =>
      post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filteredPosts);

    const filteredComments = comments.filter(comment =>
      comment.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredComments(filteredComments);

    const filteredTodos = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTodos(filteredTodos);

    const filteredAlbums = albums.filter(album =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAlbums(filteredAlbums);

    const filteredPhotos = photos.filter(photo =>
      photo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPhotos(filteredPhotos);
  }, [searchQuery, users, posts, comments, todos, albums, photos]);


  
  
  return (
    <div className="app">
      <aside className="drawer">
        {/* <menu className='menu'>menu</menu> */}
        <ul className="drawer-menu">
          <li  onClick={()=> setSelectedTab('Users')} className={selectedTab==='Users' ? 'active' :''}><i class="bi bi-people bi-mx-auto p-2"></i>{" "}{" "}Users</li>
          <li onClick={() => setSelectedTab('Posts')} className={selectedTab === 'Posts' ? 'active' : ''}> <i class="bi bi-bookmark-heart bi-mx-auto p-2"></i> {" "}{" "}Posts</li>
          <li onClick={() => setSelectedTab('Comments')} className={selectedTab === 'Comments' ? 'active' :''}><i class="bi bi-chat-heart bi-mx-auto p-2"></i> {" "}{" "}Comments</li>
          <li onClick={() => setSelectedTab('Photos')} className={selectedTab === 'Photos' ? 'active' : ''}><i class="bi bi-images bi-mx-auto p-2"></i> {" "}{" "}Photos</li>
          <li onClick={()=> setSelectedTab('Todos')} className={selectedTab==='Todos' ? 'active' :''}><i class="bi bi-card-list bi-mx-auto p-2" ></i> {" "}{" "}Todos</li>
          <li onClick={()=> setSelectedTab('Albums')} className={selectedTab==='Albums' ? 'active' :''}><i class="bi bi-columns bi-mx-auto p-2"></i> {" "}{" "}Albums</li>
        </ul>
      </aside>

      <main className="main-content">
      


        {successMessage && (
        <div className="alert"   style={{ height:'50px',color:'white',background:'rgb(14, 80, 14)', width:'240px',position: 'fixed', top: '10px', right: '10px', }}>
          {successMessage}
        </div>
      )}

  {/* Edit Post Modal */}
  <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="editModalLabel">Edit Post</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleUpdatePost}>
          <div className="mb-3">
            <label htmlFor="edit-post-title" className="col-form-label">Title:</label>
            <input
              type="text"
              className="form-control"
              id="edit-post-title"
              value={editPostTitle}
              onChange={(e) => setEditPostTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edit-post-body" className="col-form-label">Body:</label>
            <textarea
              className="form-control"
              id="edit-post-body"
              value={editPostBody}
              onChange={(e) => setEditPostBody(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
{/* Edit user Modal */}
<div className="modal fade" id="edituserModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="editModalLabel">Edit User</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <form onSubmit={handleUpdateUser}>
          <div className="mb-3">
            <label htmlFor="edit-post-name" className="col-form-label">Name:</label>
            <input
              type="text"
              className="form-control"
              id="edit-post-name"
              value={editUserName}
              onChange={(e) => setEditUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edit-post-body" className="col-form-label">Email:</label>
            <input
              type="text"
              className="form-control"
              id="edit-post-title"
              value={editUserEmail}
              onChange={(e) => setEditUserEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="edit-post-body" className="col-form-label">Phone:</label>
            <input
              type="text"
              className="form-control"
              id="edit-post-title"
              value={editUserPhone}
              onChange={(e) => setEditUserPhone(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

{/* Edit Photo Modal */}
<div className="modal fade" id="editphotoModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="editModalLabel">Edit Photo</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div className="modal-body">
          <form onSubmit={handleUpdatePhoto}>
          {/* <div class="input-group mb-3">
  <input type="file" class="form-control" 
  id="inputGroupFile02"
   value={editPhotoThumbnailUrl}
   onChange={(e) => setEditPhotoThumbnailUrl(e.target.value)}/>
</div> */}
          <div className="mb-3">
            <label htmlFor="edit-post-title" className="col-form-label">Title:</label>
            <textarea
              className="form-control"
              id="edit-post-title"
              value={editPhotoTitle}
              onChange={(e) => setEditPhotoTitle(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>


{/*delete post modal*/}
<div className="modal fade" id="deletepostModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="deleteModalLabelpost">Confirm Deletion</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete this Post?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>Yes</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>

{/*delete user modal*/}
<div className="modal fade" id="deleteuserModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="deleteModalLabeluser">Confirm Deletion</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete this User?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDeleteUser}>Yes</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>
{/*delete photo modal*/}
<div className="modal fade" id="deletephotoModal" tabIndex="-1" aria-labelledby="deleteModalLabelphoto" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="deleteModalLabelphoto">Confirm Deletion</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete this Photo?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDeletePhoto}>Yes</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>

        {selectedTab === 'Posts' && (
          <>
          <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
         
         <i class="bi bi-bookmark-heart bi-mx-auto p-2"></i> {" "}{" "}Posts
        </a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
          <button  type="button" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#postModal" data-bs-whatever="@mdo">CreatePost</button>
        </form>
      </div>
    </nav>
          <div className="box-container">
            {filteredPosts.map(post => (
              <div key={post.id} className="post">
                <h2>{post.title}</h2>
                <div className='both-btn'>
                <button className='edit-button' onClick={() => handleEditPost(post)} data-bs-toggle="modal" data-bs-target="#editModal"><i className="bi bi-pencil-square"></i></button>
                <button className='delete-button' onClick={() => handleDeletePost(post)} data-bs-toggle="modal" data-bs-target="#deletepostModal"><i class="bi bi-trash3"></i></button>
                </div>
                <br/>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
          </>
        )}



{selectedTab === 'Users' && (
  <>
    <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
        <i class="bi bi-people bi-mx-auto p-2" ></i> {" "}{" "}Users</a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
          <button  type="button" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#userModal" data-bs-whatever="@mdo">CreateUser</button>
        </form>
      </div>
    </nav>

    <div className="box-container">
     
      {filteredUsers.map(user => (
        <div key={user.id} className="post">
         {/* <div className="user-info">
              <div className="user-initials">{getInitials(user.name)}</div>
              <h2 className="user-name">{user.name}</h2>
            </div> */}  
            <ol class="list-group">
           
  <li class="list-group-item d-flex justify-content-between align-items-start">
  <div className="user-info">
    <div className="user-initials">{getInitials(user.name)}</div>
    <h3 className="user-name mx-auto m-8" >{user.name}</h3>
    </div>
    <span className='edit-button' onClick={() => handleEditUser(user)} data-bs-toggle="modal" data-bs-target="#edituserModal"><i className="bi bi-pencil-square"></i></span>
            <span className='delete-button' onClick={() => handleDeleteUser(user)} data-bs-toggle="modal" data-bs-target="#deleteuserModal"><i className="bi bi-trash"></i></span>
          
  </li>  
</ol>           
   
           <br/>
            <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      ))}
    </div>
 
  </>
)}

        {selectedTab === 'Photos' && (
          <>
          <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
         
        <i class="bi bi-images bi-mx-auto p-2"></i> {" "}{" "}Photos
        </a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
          <button  type="button" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#photoModal" data-bs-whatever="@mdo">CreatePhoto</button>
        </form>
      </div>
    </nav>
          <div className="box-container">
            {filteredPhotos.map(photo => (
              <div key={photo.id} className="post">
                 <p>{photo.title}</p>
                 <div className='both-btn'>
            <button className='edit-button'  onClick={() => handleEditPhoto(photo)} data-bs-toggle="modal" data-bs-target="#editphotoModal"><i className="bi bi-pencil-square"></i></button>
            <button className='delete-button' onClick={() => handleDeletePhoto(photo)} data-bs-toggle="modal" data-bs-target="#deletephotoModal"><i className="bi bi-trash"></i></button>
          </div>
                <img src={photo.thumbnailUrl}  />
               
               
              </div> 
            ))}
          </div>
          </>
        )}


        {selectedTab === 'Todos' && (
           <>
           <nav className="navbar">
       <div className="container-fluid">
         <a className="navbar-brand" href="#">
          
         <i class="bi bi-card-list bi-mx-auto p-2"></i> {" "}{" "}Todos
         
         </a>
         <form className="d-flex" role="search">
           <input className="form-control me-2" value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
           <button  type="button" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#postModal" data-bs-whatever="@mdo">CreateTodo</button>
         </form>
       </div>
     </nav>
          <div className="box-container">
            {filteredTodos.map(todo => (
              <div key={todo.id} className="post">
                <h2>{todo.title}</h2>
              </div>
            ))}
          </div>
          </>
        )}

        {selectedTab === 'Albums' && (
           <>
           <nav className="navbar">
       <div className="container-fluid">
         <a className="navbar-brand" href="#">
          
         <i class="bi bi-columns bi-mx-auto p-2"></i> {" "}{" "}Albums
         </a>
         <form className="d-flex" role="search">
           <input className="form-control me-2" value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
           <button  type="button" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#postModal" data-bs-whatever="@mdo">CreateAlbum</button>
         </form>
       </div>
     </nav>
          <div className="box-container">
            {filteredAlbums.map(album => (
              <div key={album.id} className="post">
                <h2>{album.title}</h2>
              </div>
            ))}
          </div>
          </>
        )}


        {selectedTab === 'Comments' && (
          <>
          <nav className="navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
         
        <i class="bi bi-chat-heart bi-mx-auto p-2"></i> {" "}{" "}Comments
        </a>
        <form className="d-flex" role="search">
          <input className="form-control me-2" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
          <button  type="button" class="btn btn-dark"  data-bs-toggle="modal" data-bs-target="#postModal" data-bs-whatever="@mdo">CreateComment</button>
        </form>
      </div>
    </nav>
          <div className="box-container">
            {filteredComments.map(comment => (
              <div key={comment.id} className="post">
                <h2>{comment.name}</h2>
                <div className='both-btn'>
                <button className='edit-button'  data-bs-toggle="modal" data-bs-target="#editModal"><i className="bi bi-pencil-square"></i></button>
                <button className='delete-button'  data-bs-toggle="modal" data-bs-target="#deletepostModal"><i class="bi bi-trash3"></i></button>
                </div>
                <p>{comment.email}</p>
                <p>{comment.body}</p>
              </div>
            ))}
          </div>
          </>
        )}


        {/* Add Post Modal */}
              <div className="modal fade" id="postModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Post</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handlePostSubmit}>
            <div className="mb-3">
              <label htmlFor="post-title" className="col-form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                id="post-title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="post-body" className="col-form-label">Body:</label>
              <textarea
                className="form-control"
                id="post-body"
                value={newPostBody}
                onChange={(e) => setNewPostBody(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

        {/* Add User Modal */}
        <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Post</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleUserSubmit}>
            <div className="mb-3">
              <label htmlFor="post-title" className="col-form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                id="post-title"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="post-title" className="col-form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                id="post-title"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
              />
            </div>
         
            <div className="mb-3">
              <label htmlFor="post-title" className="col-form-label">Phone:</label>
              <input
                type="text"
                className="form-control"
                id="post-title"
                value={newUserPhone}
                onChange={(e) => setNewUserPhone(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>


  {/*photo add modal */}
  <div className="modal fade" id="photoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">  
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Photo</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handlePhotoSubmit}>
          <div class="input-group mb-3">
  <input type="file" class="form-control" id="inputGroupFile02"
   value={newPhotoThumbnailUrl}
   onChange={(e) => setNewPhotoThumbnailUrl(e.target.value)}/>
  
</div>
            <div className="mb-3">
              <label htmlFor="post-body" className="col-form-label">Title:</label>
              <textarea
                className="form-control"
                id="post-body"
                value={newPhotoTitle}
                onChange={(e) => setNewPhotoTitle(e.target.value)}
                required
              />
            </div>
            <div className="modal-footer">
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Submit</button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>





    
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity="success"
            sx={{ marginTop: '-10px', fontSize: '14px', fontWeight: '500', fontFamily: 'Verdana, Geneva, sans-serif', backgroundColor: 'black', color: '#ccc', width: '356px' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </main>
    </div>
  );
};
export default MainApp;
