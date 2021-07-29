import { useContext } from "react";
import { GammaContext } from "../contexts/Gamma";

const useGamma = () => {
  return { ...useContext(GammaContext) };
};

export default useGamma;
