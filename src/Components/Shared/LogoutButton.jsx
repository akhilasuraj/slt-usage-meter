import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../features/login/loginSlice";
import LogoutIcon from "../../shared/Icons/LogoutIcon";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutButtonClicked = () => {
    dispatch(setIsLoggedIn(false));
    navigate("/homepage");
    localStorage.clear();
  };

  return (
    <div onClick={logoutButtonClicked} className="cursor-pointer absolute top-3 right-3">
      <LogoutIcon />
    </div>
  );
};

export default LogoutButton;
