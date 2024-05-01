import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./ModalButton.css";

const Likes = ({ data, onUpdate }) => {
  const [isOpen, setisOpen] = useState(false);
  const [liked, setisLiked] = useState(false);
  const currUser = localStorage.getItem("token");

  const handleClick = async () => {
    console.log("Reached post route");
    await axios.post(
      `http://localhost:8001/like`,
      { id: data._id },
      {
        withCredentials: true,
      }
    );
    onUpdate();
    console.log("Finished the like process ");
  };

  return (
    <div>
      <button onClick={handleClick}>{liked ? "Liked" : "Like"}</button>
      <div onClick={() => setisOpen(true)}>
        {data.likes && data.likes.length > 0 ? (
          <p style={{ cursor: "pointer" }}>({data.likes.length})</p>
        ) : (
          <p>(0)</p>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setisOpen(false)}
        classname="modal"
        overlayClassName="overlay"
      >
        People Who Liked the post
        {data.likes && data.likes.length > 0 ? (
          <ul>
            {data.likes.map((like, index) => (
              <li key={index}>{like.user}</li>
            ))}
          </ul>
        ) : (
          <p>No likes yet</p>
        )}
        <button onClick={() => setisOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Likes;
