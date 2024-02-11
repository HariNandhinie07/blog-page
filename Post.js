import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Comment from './Comment';
import './post.css';

const Post = ({ post, onDelete, onLike, onAddComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (commentText) {
      onAddComment(post.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <div className="post-actions">
        <button onClick={() => onDelete(post.id)}>Delete</button>
        <button onClick={() => onLike(post.id)}>
          <FontAwesomeIcon icon={faHeart} />
          {post.likes} Likes
        </button>
      </div>
      <div className="comments">
        <h3>Comments</h3>
        {post.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
        <div className="add-comment">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
