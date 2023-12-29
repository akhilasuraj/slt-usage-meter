import { useState } from "react";
import { useDispatch } from "react-redux";
import { coreApiService } from "../../shared/services/coreApiService";
import logo from "../../assets/images/logo-large-white.png";
import { setIsLoggedIn } from "../../features/login/loginSlice";
import { LocalStorageKeys } from "../../shared/constants/constants";

const Login = () => {
  const [input, setInput] = useState({});

  const dispatch = useDispatch();

  const inputHandler = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const loginButtonClickeed = (e) => {
    e.preventDefault();
    loginWithEmail({ userId: input.userId, password: input.password });
  };

  const loginWithEmail = async ({ userId, password }) => {
    await coreApiService
      .post("Account", "Login", { username: userId, password: password, channelID: "WEB" })
      .then((response) => {
        if (response?.status === 200) {
          localStorage.setItem(LocalStorageKeys.AccessToken, response.data.accessToken);
          localStorage.setItem(LocalStorageKeys.RefreshToken, response.data.refreshToken);
        } else {
          dispatch(setIsLoggedIn(false));
        }
        return coreApiService.get("AccountOMNI", "GetAccountDetailRequest");
      })
      .then((response) => {
        if (response?.status === 200) {
          localStorage.setItem(LocalStorageKeys.TelephoneNumber, response.data?.dataBundle[0]?.telephoneno);
        } else {
          dispatch(setIsLoggedIn(false));
        }
        return coreApiService.get("AccountOMNI", "GetServiceDetailRequest", null, { telephoneNo: localStorage.getItem(LocalStorageKeys.TelephoneNumber) });
      })
      .then((response) => {
        if (response?.status === 200) {
          localStorage.setItem(LocalStorageKeys.ServiceId, response.data?.dataBundle?.listofBBService[0]?.serviceID);
          dispatch(setIsLoggedIn(true));
        } else {
          dispatch(setIsLoggedIn(false));
        }
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <button className="border-solid border-2 border-opacity-30 border-slate-800 bg-blue-500 px-5 py-2 rounded-full" onClick={loginButtonClickeed}>
          <p className="drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  text-white font-medium text-l ">Sign In</p>
        </button>
        <img src={logo} className="w-5/12" alt="" />
      </div>
      <div>
        <label className="block mt-3 text-sm font-semibold text-gray-800">User ID</label>
        <input
          type="email"
          name="userId"
          className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white border rounded-md focus:border-blue-700 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Email or mobile number"
          onChange={inputHandler}
        />
      </div>
      <div>
        <label className="block mt-3 text-sm font-semibold text-gray-800">Password</label>
        <input
          type="password"
          name="password"
          className="block w-full px-4 py-2 mt-1 text-gray-800 bg-white border rounded-md focus:border-blue-700 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Password"
          onChange={inputHandler}
        />
      </div>
    </div>
  );
};

export default Login;
