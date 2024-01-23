import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div className="post" key={value.id}>
            <div className="title">{value.title}</div>
            <div className="body">{value.postsText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}
