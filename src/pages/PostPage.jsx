import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState();
  const [post, setPost] = useState(null);

  return <div>PostPage</div>;
};

export default PostPage;
