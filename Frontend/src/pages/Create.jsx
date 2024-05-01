import AppBar from "../components/AppBar";
import CreateAndUpdate from "../components/CreateAndUpdate";

const Create = () => {
  return (
    <>
      <AppBar />
      <div className="createPage">
        <CreateAndUpdate
          title={""}
          subtitle={""}
          content={""}
          flag={false}
          id={null}
        />
      </div>
    </>
  );
};

export default Create;
