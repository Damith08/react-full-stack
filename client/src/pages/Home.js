import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/posts")
      .then((res) => {
        setListOfPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div
            className="post"
            key={value.id}
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.postsText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}
