import dynamic from "next/dynamic";

export const LottieUtils = dynamic(() => import("lottie-react"), {
  ssr: false,
});
