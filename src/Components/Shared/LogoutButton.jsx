import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../features/login/loginSlice";
import LogoutIcon from "../../shared/Icons/LogoutIcon";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const logoutButtonClicked = () => {
    dispatch(setIsLoggedIn(false));
    localStorage.clear();
  };

  return (
    <div onClick={logoutButtonClicked} className="cursor-pointer absolute top-3 right-3">
      <LogoutIcon />
    </div>
  );
};

export default LogoutButton;
