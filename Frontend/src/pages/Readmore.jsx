import { useEffect, useState } from "react";
import Navbar from "../components/AppBar";
import axios from "axios";
import ModalButton from "../components/ModalButton";
import Share from "../components/Share";
import Likes from "../components/Likes";

const Readmore = () => {
  const id = window.location.pathname.split("/")[2];
  const [data, setData] = useState("");

  async function getBlog() {
    const res = await axios.get(`http://localhost:8001/read/${id}`);
    setData(res.data);
  }

  useEffect(() => {
    getBlog();
  });

  return (
    <div>
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
      <Likes data={data} onUpdate={getBlog} />
      <ModalButton data={data} onUpdate={getBlog} />
      <Share />
    </div>
  );
};

export default Readmore;
