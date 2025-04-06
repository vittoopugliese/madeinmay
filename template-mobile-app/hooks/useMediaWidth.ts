import {useState, useEffect} from "react";
import {Dimensions} from "react-native";

const useMediaWidth = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [isSmallMobile, setIsSmallMobile] = useState(true);
  const [isLandscape, setIsLandscape] = useState(false);
  const [usingScrollDaySelector, setUsingScrollDaySelector] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const {width, height} = Dimensions.get("window");
      setUsingScrollDaySelector(width < 954);
      setIsMobile(width < 724);
      setIsSmallMobile(width < 474);
      setIsLandscape(width > height);
    };

    const subscription = Dimensions.addEventListener("change", handleResize);
    handleResize();

    return () => {
      subscription?.remove();
    };
  }, []);

  return {isMobile, isSmallMobile, isLandscape, usingScrollDaySelector};
};

export default useMediaWidth;
