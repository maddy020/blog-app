import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./ModalButton.css";

const Likes = ({ data, onUpdate }) => {
  const [isOpen, setisOpen] = useState(false);
  const [liked, setisLiked] = useState(false);

  const handleClick = async () => {
    await axios.post(
      `${import.meta.env.VITE_BASE_URL}/like`,
      { id: data._id },
      {
        withCredentials: true,
      }
    );
    setisLiked(!liked);
    onUpdate();
  };

  return (
    <div className="btnContainer">
      <button className="authButton" onClick={handleClick}>
        {liked ? "Liked" : "Like"}
      </button>
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
