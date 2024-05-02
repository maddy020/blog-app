import { useState } from "react";
import Modal from "react-modal";
import "../components/ModalButton.css";

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  EmailIcon,
  TwitterIcon,
  LinkedinIcon,
  FacebookIcon,
  TelegramIcon,
  WhatsappIcon,
} from "react-share";

const Share = () => {
  const [isOpen, setIsOpen] = useState(false);
  const shareurl = window.location.href;
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button className="authButton" onClick={openModal}>
        Share
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Share your Blog on Social Media</h2>

        <TwitterShareButton url={shareurl}>
          <TwitterIcon size={70} round={true} />
        </TwitterShareButton>
        <EmailShareButton url={shareurl}>
          <EmailIcon size={70} round={true} />
        </EmailShareButton>
        <FacebookShareButton url={shareurl}>
          <FacebookIcon size={70} round={true} />
        </FacebookShareButton>
        <LinkedinShareButton url={shareurl}>
          <LinkedinIcon size={70} round={true} />
        </LinkedinShareButton>
        <TelegramShareButton url={shareurl}>
          <TelegramIcon size={70} round={true} />
        </TelegramShareButton>
        <WhatsappShareButton url={shareurl}>
          <WhatsappIcon size={70} round={true} />
        </WhatsappShareButton>
      </Modal>
    </div>
  );
};

export default Share;
