import React from 'react';
import axios from 'axios';

const PostsComponent = ({ posts, setPosts, handleSnackbar, setSearchQuery }) => {
    const [posts, setPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');
    const [editPostTitle, setEditPostTitle] = useState('');
    const [editPostBody, setEditPostBody] = useState('');
    const [editPostId, setEditPostId] = useState(null);
    //const [filteredPosts, setFilteredPosts] = useState([]);

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

  useEffect(() => {
    fetchPosts();
  }, []);
 
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:5001/posts');
        setPosts(postsResponse.data);        
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const filteredPosts = posts.filter(post =>
      post.title && post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filteredPosts);
 


  return (
    <div>
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
                 <ol class="list-group">
           
           <li class="list-group-item d-flex justify-content-between align-items-start">
           <div className="user-info">
             <div className="user-initials">{getInitials(post.title)}</div>
             <h3 className="user-nam" >{post.title}</h3>
             </div>
             <div class="btn-group" role="group" aria-label="Basic example">
           
           <button type="button" class="btn btn-light" onClick={() => handleEditPost(post)} data-bs-toggle="modal" data-bs-target="#editModal"><i className="bi bi-pencil-square"></i></button>
           <button type="button" class="btn btn-light" onClick={() => handleDeletePost(post)} data-bs-toggle="modal" data-bs-target="#deletepostModal"><i className="bi bi-trash"></i></button>
          
         </div>    
              
           </li>  
           
         </ol>  
         <br/>  
         <p>{post.body}</p>         
              </div>
            ))}
          </div>
          </>
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
    </div>
    
  );
};

export default PostsComponent;
