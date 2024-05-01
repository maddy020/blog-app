import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import "./ModalButton.css";
import axios from "axios";

const ModalButton = ({ data, onUpdate }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const inputRef = useRef(null);
  const currUser = localStorage.getItem("token");
  console.log(currUser);

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = async () => {
    try {
      if (inputRef.current.value === "") return alert("Please enter a comment");
      const details = {
        comment: inputRef.current.value,
        blogid: data._id,
      };
      await axios.post("http://localhost:8001/comments", details, {
        withCredentials: true,
      });
      onUpdate();
    } catch (error) {
      console.log("Error in posting comment", error);
    }
    inputRef.current.value = "";
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8001/comments/${data._id}/${id}`,
        data._id
      );
      onUpdate();
    } catch (error) {
      console.log("Error in deleting comment", error);
    }
  };
  return (
    <div>
      <button onClick={openModal}>Comments</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div>
          <h2>Comment Your Thoughts</h2>
          <input
            type="text"
            placeholder="Add your comment here"
            ref={inputRef}
          />
          <button onClick={handleClick}>Post</button>
          {data.comments && data.comments.length > 0 ? (
            <ul>
              {data.comments.map((comment, index) => (
                <div key={index}>
                  <p>{comment.user}</p>
                  <li key={index}>
                    {comment.content}
                    {currUser == comment.user && (
                      <button onClick={() => handleDelete(comment._id)}>
                        Delete
                      </button>
                    )}
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
          <button onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalButton;
