import ProfileIcon from "../../shared/Icons/ProfileIcon";
import { coreApiService } from "../../shared/services/coreApiService";

const Details = () => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="">
        <p className="text-4xl font-bold flex mb-4 justify-center">
          <div className="text-blue-800 mr-2">YOUR</div> <div className="text-green-500">PROFILE</div>
        </p>
        <div className="border-solid border-[0.3px] border-gray-300 rounded-md p-3">
          <div className="mb-2">
            <p className="text-gray-400 text-2xl font-bold">Your Subscription Details</p>
          </div>
          <div className="flex items-center">
            <ProfileIcon />
            <p className="ml-2">Full Name: {}</p>
          </div>
          <div className="flex items-center">
            <ProfileIcon />
            <p className="ml-2">Email: {}</p>
          </div>
          <div className="flex items-center">
            <ProfileIcon />
            <p className="ml-2">Name: {}</p>
          </div>
          <div className="flex items-center">
            <ProfileIcon />
            <p className="ml-2">Name: {}</p>
          </div>
          <div className="flex items-center">
            <ProfileIcon />
            <p className="ml-2">Name: {}</p>
          </div>
          <div className="flex items-center">
            <ProfileIcon />
            <p className="ml-2">Name: {}</p>
          </div>
          <p>Email: </p>
          <p>Mobile: </p>
          <p>Subscriber ID: </p>
          <p>Broadband Package: </p>
          <p>Billing Date: </p>
        </div>
      </div>
    </div>
  );
};

export const loader = async () => {
  const profileData = coreApiService
    .get("VAS", "GetProfileRequest", null, { subscriberID: localStorage.getItem(LocalStorageKeys.ServiceId) })
    .then((response) => {
      if (response?.status === 200) {
        return response.data;
      } else {
        dispatch(setIsLoggedIn(false));
        navigate("/login");
        localStorage.clear();
      }
    })
    .catch((error) => {
      dispatch(setIsLoggedIn(false));
      console.log(error);
    });
  return { profileData };
};

export default Details;
