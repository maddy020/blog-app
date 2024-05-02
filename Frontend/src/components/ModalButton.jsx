import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import "./ModalButton.css";
import axios from "axios";
import del from "../../assets/delete.svg";

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
      await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, details, {
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
        `${import.meta.env.VITE_BASE_URL}/comments/${data._id}/${id}`,
        data._id
      );
      onUpdate();
    } catch (error) {
      console.log("Error in deleting comment", error);
    }
  };
  return (
    <div>
      <button className="authButton" onClick={openModal}>
        Comments
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div>
          <h2>Comment Your Thoughts</h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              type="text"
              placeholder="Add your comment here"
              ref={inputRef}
              className="inputBox"
            />
            <button className="authButton" onClick={handleClick}>
              Post
            </button>
          </div>
          {data.comments && data.comments.length > 0 ? (
            <ul>
              {data.comments.map((comment, index) => (
                <div key={index}>
                  <li key={index}>
                    <p>{comment.user}</p>
                    {comment.content}
                    {currUser == comment.user && (
                      <img
                        onClick={() => handleDelete(comment._id)}
                        src={del}
                        alt=""
                        width={20}
                        height={20}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </li>
                </div>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
          <button className="authButton" onClick={closeModal}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ModalButton;
