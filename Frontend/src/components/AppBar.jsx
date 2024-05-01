import { DropdownMenu } from "@radix-ui/themes";
import { Link } from "react-router-dom";
export default function AppBar() {
  const currUser = localStorage.getItem("token");
  return (
    <main className="nav">
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Blog
        </Link>
      </h1>
      {currUser === null && (
        <div className="authButtondiv">
          <Link className="authButton" to="/login">
            Login
          </Link>
          <Link className="authButton" to="/signup">
            Signup
          </Link>
        </div>
      )}
      {currUser !== null && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button className="authButton">
              Hi,{currUser}
              <DropdownMenu.TriggerIcon />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item shortcut="⌘ E" className="more">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/myblogs"
              >
                My Blogs
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item shortcut="⌘ D" className="more">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/logout"
              >
                Logout
              </Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </main>
  );
}
