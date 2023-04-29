import { FCWithChildren } from "@/utils/types";
import cx from "classnames";
import Icon from "@/components/Icon";

const Drawer: FCWithChildren<{
  show: boolean;
  title: string;
  userName: string;
  avatar?: string;
  onClose: () => void;
}> = ({ show, title, userName, avatar, onClose, children }) => {
  return (
    <div
      className={cx(
        "absolute z-40 h-full w-full transform transition-transform delay-150 ease-in-out",
        show ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full w-full bg-gray-900 opacity-50" onClick={onClose} />
      <div className="fixed top-0 z-40 z-40 h-full w-64 flex-col justify-between overflow-y-auto overflow-x-hidden bg-gray-800 pb-4 shadow transition duration-150 ease-in-out xl:hidden">
        <div className="h-full px-6">
          <div className="flex h-full w-full flex-col justify-between">
            <div>
              <div className="mt-6 flex w-full items-center justify-between">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <p className="ml-3  text-base text-white">{title}</p>
                  </div>
                  <Icon icon="close" className="h-5 w-5 text-white" onClick={onClose} />
                </div>
              </div>
              <div className="mt-10 flex h-auto flex-col">{children}</div>
            </div>
            <div className="w-full pt-4">
              <div className="border-t border-gray-700">
                <div className="mt-5 flex w-full items-center justify-between pt-1">
                  <div className="flex h-full items-center items-center justify-center">
                    {avatar && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img alt="profile-pic" src={avatar} className="h-8 w-8 rounded-md" />
                    )}
                    <p className=" ml-2 text-base leading-4 text-white">{userName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
