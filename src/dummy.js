
//  // Import your CSS file for styling

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/PostData.css';


// const App = () => {
//   const [posts, setPosts] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Posts');

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//       .then(response => {
//         setPosts(response.data);
//       })
      
//       .catch(error => {
//         console.error('Error fetching data: ', error);
//       });
//   }, []);


//   //https://jsonplaceholder.typicode.com/photos
//   //https://jsonplaceholder.typicode.com/Todos
//   //https://jsonplaceholder.typicode.com/Albums
//   return (
//     <div className="app">
     
//       <aside className="drawer">
        
//         <ul className="drawer-menu">
//           <li onClick={() => setSelectedTab('Posts')} className={selectedTab === 'Posts' ? 'active' : ''}>Posts</li>
//           <li onClick={() => setSelectedTab('Photos')} className={selectedTab === 'Photos' ? 'active' : ''}>Photos</li>
//           <li onClick={()=> setSelectedTab('Todos')} className={selectedTab==='Todos' ? 'active' :''}>Todos</li>
//           <li onClick={()=> setSelectedTab('Albums')} className={selectedTab==='Albums' ? 'active' :''}>Albums</li>
//           <li onClick={()=> setSelectedTab('Users')} className={selectedTab==='Users' ? 'active' :''}>Users</li>
//           <li onClick={() => setSelectedTab('Comments')} className={selectedTab === 'Comments' ? 'active' : ''}>Comments</li>
//         </ul>
//       </aside>
//       <main className="main-content">
//         {/* Render content based on selected tab */}
//         {selectedTab === 'Posts' && (
//           <div className="box-container">
//             {posts.map(post => (
//               <div key={post.id} className="post">
//                 <h2>{post.title}</h2>
//                 <p>{post.body}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         {/* Add similar rendering for other tabs */}
//       </main>
//     </div>
//   );
// };

// export default App;


// App.js

// import React, { useState, useEffect } from 'react';
// import fetchPhotos from './Photos';
// import '../styles/PostData.css'; 
// import axios from 'axios';// Import your CSS file for styling

// const PostData = () => {
//   const [posts, setPosts] = useState([]);
//   const [photos, setPhotos] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Posts');

//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//       .then(response => {
//         setPosts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching posts: ', error);
//       });

//     fetchPhotos()
//       .then(photosData => {
//         setPhotos(photosData);
//       })
//       .catch(error => {
//         console.error('Error fetching photos: ', error);
//       });
//   }, []);

//   return (
//     <div className="app">
//       <nav className="app-bar">App Bar</nav>
//       <aside className="drawer">
//         <div className="drawer-header">Menu</div>
//         <ul className="drawer-menu">
//           <li onClick={() => setSelectedTab('Posts')} className={selectedTab === 'Posts' ? 'active' : ''}>Posts</li>
//           <li onClick={() => setSelectedTab('Photos')} className={selectedTab === 'Photos' ? 'active' : ''}>Photos</li>
//           {/* Add other tabs here */}
//         </ul>
//       </aside>
//       <main className="main-content">
//         {/* Render content based on selected tab */}
//         {selectedTab === 'Posts' && (
//           <div className="box-container">
//             {posts.map(post => (
//               <div key={post.id} className="post">
//                 <h2>{post.title}</h2>
//                 <p>{post.body}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         {selectedTab === 'Photos' && (
//           <div className="box-container">
//             {photos.map(photo => (
//               <div key={photo.id} className="photo">
//                 <img src={photo.url} alt={photo.title} />
//                 <p>{photo.title}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         {/* Add similar rendering for other tabs */}
//       </main>
//     </div>
//   );
// };

// export default PostData;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import fetchPhotos from '../API/Photos';
// import fetchTodos from '../API/Todos';
// import fetchAlbums from '../API/Albums';
// import fetchUsers from '../API/Users';
// import fetchComments from '../API/Comments'
// import '../styles/PostData.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

// const App = () => {
//   const [posts, setPosts] = useState([]);
//   const [photos, setPhotos] = useState([]);
//   const [todos,setTodos] = useState([]);
//   const [albums,setAlbums]= useState([]);
//   const [users,setUsers] = useState([]);
//   const [comments,setComments] = useState([]);
//   const [selectedTab, setSelectedTab] = useState('Posts');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [filteredComments, setFilteredComments] = useState([]);
//   const [filteredTodos, setFilteredTodos] = useState([]);
//   const [filteredAlbums, setFilteredAlbums] = useState([]);
//   const [filteredPhotos, setFilteredPhotos] = useState([]);



//   useEffect(() => {
//     // Filter users based on searchQuery when it changes
//     const filtered = users.filter(user =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [searchQuery, users]);


//   useEffect(() => {
//     // Filter users based on searchQuery when it changes
//     const filtered = posts.filter(post =>
//       post.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredPosts(filtered);
//   }, [searchQuery, posts]);


//   useEffect(() => {
//     // Filter users based on searchQuery when it changes
//     const filtered = comments.filter(comment =>
//       comment.name.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredComments(filtered);
//   }, [searchQuery, comments]);

//   useEffect(() => {
//     // Filter users based on searchQuery when it changes
//     const filtered = todos.filter(todo =>
//       todo.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredTodos(filtered);
//   }, [searchQuery, todos]);

//   useEffect(() => {
//     // Filter users based on searchQuery when it changes
//     const filtered = albums.filter(album =>
//       album.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredAlbums(filtered);
//   }, [searchQuery, albums]);

//   useEffect(() => {
//     // Filter users based on searchQuery when it changes
//     const filtered = photos.filter(photo =>
//       photo.title.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredPhotos(filtered);
//   }, [searchQuery, photos]);


//   useEffect(() => {
//     axios.get('https://jsonplaceholder.typicode.com/posts')
//       .then(response => {
//         setPosts(response.data);
//         console.log(response);
//       })
//       .catch(error => {
//         console.error('Error fetching posts: ', error);
//       });

//     fetchPhotos()
//       .then(photosData => {
//         setPhotos(photosData);
//         console.log(photosData);
//       })
//       .catch(error => {
//         console.error('Error fetching photos: ', error);
//       });


//       fetchTodos()
//       .then(todosData => {
//         setTodos(todosData);
//       })
//       .catch(error => {
//         console.error('Error fetching todos: ', error);
//       });


//       fetchAlbums()
//       .then(albumsData => {
//         setAlbums(albumsData);
//       })
//       .catch(error => {
//         console.error('Error fetching albums: ', error);
//       });

//       fetchUsers()
//       .then(usersData => {
//         setUsers(usersData);
//       })
//       .catch(error => {
//         console.error('Error fetching users: ', error);
//       });


//       fetchComments()
//       .then(commentsData => {
//         setComments(commentsData);
//       })
//       .catch(error => {
//         console.error('Error fetching comments: ', error);
//       });
      

//   }, []);



//   return (
//     <div className="app">
     
//       <aside className="drawer">
//        <menu className='menu'>menu</menu>
//         <ul className="drawer-menu">
//         <li onClick={()=> setSelectedTab('Users')} className={selectedTab==='Users' ? 'active' :''}>Users</li>
//           <li onClick={() => setSelectedTab('Posts')} className={selectedTab === 'Posts' ? 'active' : ''}>Posts</li>
//           <li onClick={() => setSelectedTab('Comments')} className={selectedTab === 'Comments' ? 'active' :''}>Comments</li>
//           <li onClick={() => setSelectedTab('Photos')} className={selectedTab === 'Photos' ? 'active' : ''}>Photos</li>
//           <li onClick={()=> setSelectedTab('Todos')} className={selectedTab==='Todos' ? 'active' :''}>Todos</li>
//            <li onClick={()=> setSelectedTab('Albums')} className={selectedTab==='Albums' ? 'active' :''}>Albums</li>
//         </ul>
//       </aside>

     
//       <main className="main-content">
        
//       <div className="search-container">
//                 <FontAwesomeIcon icon={faSearch} className='search-icon' />
//                 <input
//                   className='searchbar'
//                   type="text"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
              
//       {selectedTab === 'Users' && (
//           <div className="box-container">
//             {filteredUsers.map(user => (  // users
//               <div key={user.id} className="post">
//                 <h2>{user.name}</h2>
//                 <p>{user.username}</p>
//                 <p>{user.email}</p>
//                 <p>{user.address.street}</p>
//                 <p>{user.address.city}</p>
//                 <p>{user.address.zipcode}</p>
//                 <p>{user.phone}</p>
//                 <p>{user.website}</p>
//                 <p>{user.company.name}</p>
//               </div>
//             ))}
//           </div>
//         )}


//         {selectedTab === 'Posts' && (
//           <div className="box-container">
//             {filteredPosts.map(post => (   //posts
//               <div key={post.id} className="post">
//                 <h2>{post.title}</h2>
//                 <p>{post.body}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {selectedTab === 'Photos' && (
//           <div className="box-container">  
//             {filteredPhotos.map(photo => (    //photos
//               <div key={photo.id} className="post">
//                 <img src={photo.thumbnailUrl} alt={photo.title} />
                
//                 <p>{photo.title}</p>
//               </div>
//             ))}
//           </div>
//         )}

// {selectedTab === 'Todos' && (
//           <div className="box-container">
//             {filteredTodos.map(todo => (  //todos
//               <div key={todo.id} className="post">
//                 <h2>{todo.title}</h2>
//               </div>
//             ))}
//           </div>
//         )}
       

//        {selectedTab === 'Albums' && (
//           <div className="box-container">
//             {filteredAlbums.map(album => (   //albums
//               <div key={album.id} className="post">
//                 <h2>{album.title}</h2>
               
                
//               </div>
//             ))}
//           </div>
//         )}

// {selectedTab === 'Comments' && (
//           <div className="box-container">
//             {filteredComments.map(comment => (  //comments
//               <div key={comment.id} className="post">
//                 <h2>{comment.name}</h2>
//                 <p>{comment.email}</p>
//                 <p>{comment.body}</p>
                
//               </div>
//             ))}
//           </div>
//         )}

//       </main>
//     </div>
//   );
// };

// export default App;