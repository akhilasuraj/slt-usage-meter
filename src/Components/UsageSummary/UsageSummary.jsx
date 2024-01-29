import { useEffect, useState } from "react";
import { coreApiService } from "../../shared/services/coreApiService";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../features/login/loginSlice";
import { LocalStorageKeys } from "../../shared/constants/constants";
import ProgressBar from "../Shared/ProgressBar";
import { useNavigate } from "react-router-dom";

const UsageSummary = () => {
  const [standard, setStandard] = useState(undefined);
  const [total, setTotal] = useState(undefined);
  const [vasPackages, setVasPackages] = useState(undefined);
  const [packageName, setPackageName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    coreApiService
      .get("BBVAS", "UsageSummary", null, { subscriberID: localStorage.getItem(LocalStorageKeys.ServiceId) })
      .then((response) => {
        if (response?.status === 200) {
          setStandard(response.data?.dataBundle?.my_package_info?.usageDetails[0]);
          setTotal(response.data?.dataBundle?.my_package_info?.usageDetails[1]);
          setPackageName(response.data?.dataBundle?.my_package_info?.package_name);
          dispatch(setIsLoggedIn(true));
        } else {
          dispatch(setIsLoggedIn(false));
          navigate("/homepage");
          localStorage.clear();
        }
      })
      .catch((error) => {
        dispatch(setIsLoggedIn(false));
        console.log(error);
      });

    coreApiService
      .get("BBVAS", "GetDashboardVASBundles", null, { subscriberID: localStorage.getItem(LocalStorageKeys.ServiceId) })
      .then((response) => {
        if (response?.status === 200) {
          setVasPackages(response.data.dataBundle.usageDetails);
          dispatch(setIsLoggedIn(true));
        } else {
          dispatch(setIsLoggedIn(false));
          navigate("/homepage");
          localStorage.clear();
        }
      })
      .catch((error) => {
        dispatch(setIsLoggedIn(false));
        console.log(error);
      });
  }, []);

  let nightLimit = parseFloat(parseFloat(total?.limit) - parseFloat(standard?.limit));
  let nightUsed = parseFloat(parseFloat(total?.used) - parseFloat(standard?.used));
  let nightRemaining = parseFloat(parseFloat(total?.remaining) - parseFloat(standard?.remaining));
  let nightPercentage = (nightRemaining / nightLimit) * 100;

  return (
    <div>
      <p className="text-center text-xl font-bold">{packageName}</p>
      {standard && (
        <span>
          <p>{`${standard.name} (${standard.limit} ${standard.volume_unit})`}</p>
          <div className="flex justify-between">
            <p>Remaining : {`${standard.remaining} ${standard.volume_unit}`}</p>
            <p>Used : {`${standard.used} ${standard.volume_unit}`}</p>
          </div>
          <ProgressBar width={standard.percentage} />
        </span>
      )}
      <br />
      {total && (
        <span>
          <p>{`Night (${nightLimit.toFixed(1)} ${total.volume_unit})`}</p>
          <div className="flex justify-between">
            <p>Remaining : {`${nightRemaining.toFixed(1)} ${total.volume_unit}`}</p>
            <p>Used : {`${nightUsed.toFixed(1)} ${total.volume_unit}`}</p>
          </div>
          <ProgressBar width={nightPercentage.toFixed(0)} />
        </span>
      )}
      {vasPackages &&
        vasPackages.map((vasPackage) => (
          <div key={vasPackage.name}>
            <br />
            <span>
              <p>{`${vasPackage.name} (${vasPackage.limit} ${vasPackage.volume_unit})`}</p>
              <div className="flex justify-between">
                <p>Remaining : {`${vasPackage.remaining} ${vasPackage.volume_unit}`}</p>
                <p>Used : {`${vasPackage.used} ${vasPackage.volume_unit}`}</p>
              </div>
              <ProgressBar width={vasPackage.percentage} />
            </span>
          </div>
        ))}
    </div>
  );
};

export default UsageSummary;
