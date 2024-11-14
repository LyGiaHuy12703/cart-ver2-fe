import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../context/UserContext";
import { setLocalStorage } from "../../utils/helper";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo, setIsAuthenticated } = useContext(UserInfoContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/auth/signin", { username, password })
      .then((res) => {
        const { data } = res.data;

        setLocalStorage("access_token", data["access_token"]);
        const user = {
          email: data.email,
          roles: data.roles,
          id: data["user_id"],
          username: data.username,
        };
        setUserInfo(user);
        setIsAuthenticated(true);
        if (user.roles.includes("ROLE_ADMIN")) {
          navigate("/admin/products");
        } else {
          //check roles nếu admin thì chuyển hướng sang trang admin nếu không thì chuyển hướng sang trang products
          navigate("/products");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div
      className=" d-flex align-items-center justify-content-center py-4 shadow my-3"
      style={{ maxWidth: "500px", margin: "0 auto" }}
    >
      <form style={{ width: "70%" }} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">
            Tên đăng nhập
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUsername"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
