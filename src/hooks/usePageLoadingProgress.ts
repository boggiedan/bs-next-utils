import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";

const usePageLoadingProgress = () => {
  const router = useRouter();

  useEffect(() => {
    const handleChangeStart = () => NProgress.start();
    const handleChangeComplete = () => NProgress.done();

    router.events.on("routeChangeStart", handleChangeStart);
    router.events.on("routeChangeComplete", handleChangeComplete);
    router.events.on("routeChangeError", handleChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleChangeStart);
      router.events.off("routeChangeComplete", handleChangeComplete);
      router.events.off("routeChangeError", handleChangeComplete);
    };
  }, [router]);
};

export default usePageLoadingProgress;
