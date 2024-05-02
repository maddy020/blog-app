import { useEffect, useState } from "react";
import Navbar from "../components/AppBar";
import axios from "axios";
import ModalButton from "../components/ModalButton";
import Share from "../components/Share";
// import Likes from "../components/Likes";

const Readmore = () => {
  const id = window.location.pathname.split("/")[2];
  const [data, setData] = useState({});

  async function getBlog() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/read/${id}`);
    setData(res.data);
  }

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <Navbar />
      <div className="blog">
        <h1>{data.title}</h1>
        <div
          className="innerContent"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        <div className="btnContainer">
          <ModalButton data={data} onUpdate={getBlog} />
          <Share />
        </div>
      </div>
    </>
  );
};

export default Readmore;
