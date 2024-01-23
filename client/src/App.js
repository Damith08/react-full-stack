import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((res) => {
      setListOfPosts(res.data);
    });
  }, []);

  return (
    <div className="App">
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

export default App;
