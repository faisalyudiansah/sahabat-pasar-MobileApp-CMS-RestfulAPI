import "./navbar.scss";
import Logo from "../../assets/logoFix.svg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("_id");
        navigate("/login");
      }
    });
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logoFix.svg" alt="" />
        <span>SAHABAT PASAR</span>
      </div>
      <div className="icons">
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
