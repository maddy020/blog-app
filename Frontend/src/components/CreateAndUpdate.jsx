/* eslint-disable react/prop-types */
import { useState, useRef, useMemo } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import InputBox from "./InputBox";
import { useNavigate } from "react-router-dom";
import { ImageEditor } from "jodit/esm/modules";
import ImageGen from "./ImageGen";

const CreateAndUpdate = ({ title, subtitle, content, flag, id }) => {
  const navigate = useNavigate();
  const [editorData, setEditorData] = useState(content);
  const tref = useRef(null);
  const stref = useRef(null);
  const editorref = useRef(null);

  const handleChange = () => {
    const data = editorref.current.value;
    setEditorData(data);
    console.log(data);
  };

  const config = useMemo(
    () => ({
      readonly: false,

      // uploader: {
      //   insertImageAsBase64URI: false,
      //   imagesExtensions: ["jpg", "png", "jpeg", "gif"],
      //   withCredentials: false,
      //   format: "json",
      //   method: "POST",
      //   url: "http://localhost:8001/upload",
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   prepareData: function (data) {
      //     data.append("file", this.file);
      //     return data;
      //   },
      //   isSuccess: function (resp) {
      //     return !resp.error;
      //   },
      //   getMsg: function (resp) {
      //     return resp.msg.join !== undefined ? resp.msg.join(" ") : resp.msg;
      //   },
      //   process: function (resp) {
      //     return {
      //       files: [resp.data],
      //       path: "",
      //       baseurl: "",
      //       error: resp.error ? 1 : 0,
      //       msg: resp.msg,
      //     };
      //   },
      //   defaultHandlerSuccess: function (data, resp) {
      //     const files = data.files || [];
      //     if (files.length) {
      //       this.selection.insertImage(files[0], null, 250);
      //     }
      //   },
      //   defaultHandlerError: function (resp) {
      //     this.events.fire("errorPopap", this.i18n(resp.msg));
      //   },
      // },
      PluginArray: [ImageEditor],
      placeholder: "Start typing here",
    }),
    []
  );

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const blogData = {
        title: tref.current.value,
        subtitle: stref.current.value,
        content: editorData,
      };
      if (flag == false) {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/create`, blogData, {
          withCredentials: true,
        });
      } else {
        console.log("reached  here");
        await axios.put(
          `${import.meta.env.VITE_BASE_URL}/edit/${id}`,
          blogData
        );
      }
      navigate("/");
    } catch (error) {
      console.error("Error in creating", error);
    }
  };

  return (
    <>
      <form
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
        className="createForm"
      >
        <h1>Create Your Blog Post</h1>
        {/* <label htmlFor="Title">Title:</label>
        <input
          type="text"
          required
          placeholder="Title"
          defaultValue={title}
          ref={tref}
        /> */}
        <InputBox type="text" cref={tref} label="Title" />
        <InputBox type="text" cref={stref} label="Sub-Title" />
        <div id="editor" className="editor">
          <JoditEditor
            ref={editorref}
            config={config}
            value={content}
            tabIndex={1}
            onChange={(event, editor) => {
              handleChange(event, editor);
            }}
          />
        </div>

        <ImageGen />
        {flag == true && (
          <button className="btn" type="submit">
            Update
          </button>
        )}
        {flag == false && (
          <button className="btn" type="submit">
            Create
          </button>
        )}
      </form>
    </>
  );
};

export default CreateAndUpdate;
