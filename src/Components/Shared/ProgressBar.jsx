import { useEffect, useState } from "react";
import { ProgressBar } from "ms-react-progress-bar";
import "ms-react-progress-bar/dist/ProgressBar.css";

const ProgressBarStriped = ({ width = 0 }) => {
  const [color, setColor] = useState("#f50000");

  useEffect(() => {
    setColor(getGreenToRed(width));
  }, [width]);

  const getGreenToRed = (percent) => {
    let r = percent < 50 ? 200 : Math.floor(200 - ((percent * 2 - 100) * 200) / 100);
    let g = percent > 50 ? 200 : Math.floor((percent * 2 * 200) / 100);
    // return `rgb(${r},${g},0)`;
    return rgbToHex(r, g, 0);
  };

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  const options = {
    type: "striped",
    height: "22px",
    borderRadius: "20px",
    labelSize: "12px",
    stripeAnimation: true,
    barColor: `${color}`,
    containerColor: "#dddddd",
    labelColor: "#000000",
    labelAlignment: "center",
    containerStyle: "border",
  };

  return (
    <>
      <ProgressBar value={width} options={options} />
    </>
  );
};

export default ProgressBarStriped;
