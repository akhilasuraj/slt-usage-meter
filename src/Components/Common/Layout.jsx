import LogoutButton from "../Shared/LogoutButton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import LoadingSpinner from "../Shared/LoadingSpinner";

const Layout = (props) => {
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isLoading = useSelector((state) => state.globalSpinner.isLoading);
  return (
    <div className="w-[450px] px-10 pt-5 pb-7 bg-slate-100 rounded-lg overflow-hidden min-h-[264px] relative">
      {isLoading && <LoadingSpinner />}
      {isLoggedIn && <LogoutButton />}
      {props.children}
    </div>
  );
};

export default Layout;
