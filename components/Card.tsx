import { FCWithChildren } from "@/utils/types";

type Props = {
  title: string;
  description?: string;
  src: string;
  alt: string;
};

const Card: FCWithChildren<Props> = ({ title, src, alt, description, children }) => {
  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">{children}</div>
      </div>
    </div>
  );
};

export default Card;
