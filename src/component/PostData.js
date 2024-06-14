
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

import React, { useState, useEffect } from 'react';
import fetchPhotos from './Photos';
import '../styles/PostData.css'; 
import axios from 'axios';// Import your CSS file for styling

const PostData = () => {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Posts');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts: ', error);
      });

    fetchPhotos()
      .then(photosData => {
        setPhotos(photosData);
      })
      .catch(error => {
        console.error('Error fetching photos: ', error);
      });
  }, []);

  return (
    <div className="app">
      <nav className="app-bar">App Bar</nav>
      <aside className="drawer">
        <div className="drawer-header">Menu</div>
        <ul className="drawer-menu">
          <li onClick={() => setSelectedTab('Posts')} className={selectedTab === 'Posts' ? 'active' : ''}>Posts</li>
          <li onClick={() => setSelectedTab('Photos')} className={selectedTab === 'Photos' ? 'active' : ''}>Photos</li>
          {/* Add other tabs here */}
        </ul>
      </aside>
      <main className="main-content">
        {/* Render content based on selected tab */}
        {selectedTab === 'Posts' && (
          <div className="box-container">
            {posts.map(post => (
              <div key={post.id} className="post">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        )}
        {selectedTab === 'Photos' && (
          <div className="box-container">
            {photos.map(photo => (
              <div key={photo.id} className="photo">
                <img src={photo.url} alt={photo.title} />
                <p>{photo.title}</p>
              </div>
            ))}
          </div>
        )}
        {/* Add similar rendering for other tabs */}
      </main>
    </div>
  );
};

export default PostData;
