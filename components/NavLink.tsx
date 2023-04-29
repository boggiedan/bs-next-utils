import { useRouter } from "next/router";
import { FC } from "react";
import cx from "classnames";
import Link from "next/link";

const NavLink: FC<{
  href: string;
  label: string;
}> = ({ href, label }) => {
  const router = useRouter();
  const selected = router.asPath === href;

  return (
    <Link
      className={cx(
        "rounded-md px-3 py-2 text-sm font-medium hover:text-white",
        selected ? "text-white" : "text-gray-300 "
      )}
      href={href}
    >
      {label}
    </Link>
  );
};

export default NavLink;
