import { FC } from "react";

const Avatar: FC<{
  src: string;
  alt?: string;
  size?: `w-${number} h-${number}`;
}> = ({ src, alt = "profile picture", size = "w-12 h-12" }) => (
  <div className={size + "rounded-md bg-cover bg-center"}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={src}
      alt={alt}
      className="h-full w-full overflow-hidden rounded-full border-2 border-white object-cover shadow dark:border-gray-700"
    />
  </div>
);

export default Avatar;
