import React, { useState } from 'react';
import Post from './Post';
import './Blog.css'; // Import the CSS file for styling

const Blog = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      comments: [],
      likes: 0,
    },
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleLikePost = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleAddComment = (postId, commentText) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                { id: Date.now(), text: commentText },
              ],
            }
          : post
      )
    );
  };

  const handleAddPost = () => {
    if (newPostTitle && newPostContent) {
      const newPost = {
        id: Date.now(),
        title: newPostTitle,
        content: newPostContent,
        comments: [],
        likes: 0,
      };
      setPosts([...posts, newPost]);
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  return (
    <div className="blog">
      <h1>My Blog</h1>
      <div className="add-post">
        <h2>Add a New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button onClick={handleAddPost}>Add Post</button>
      </div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onDelete={handleDeletePost}
          onLike={handleLikePost}
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
};

export default Blog;
