import { useEffect, useState } from "react";
import axios from "axios";
import CreateAndUpdate from "../components/CreateAndUpdate";
const Edit = () => {
  const id = window.location.pathname.split("/")[2];
  const [data, setData] = useState({});
  useEffect(() => {
    async function getBlog() {
      try {
        const res = await axios.get(`http://localhost:8001/read/${id}`);
        setData(res.data);
      } catch (error) {
        console.error("Error in reading", error);
      }
    }
    getBlog();
  }, []);
  return (
    <>
      <CreateAndUpdate
        title={data.title}
        subtitle={data.subtitle}
        content={data.content}
        flag={true}
        id={id}
      />
    </>
  );
};

export default Edit;
