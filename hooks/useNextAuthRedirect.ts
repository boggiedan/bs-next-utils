import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

type Status = "authenticated" | "loading" | "unauthenticated";

const useNextAuthRedirect = (): Status => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      (async () => {
        await router.push("/api/auth/signin");
      })();
    }
  }, [status, router]);

  return status;
};

export default useNextAuthRedirect;
