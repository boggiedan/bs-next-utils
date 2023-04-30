import { FC, useEffect, useState } from "react";
import cx from "classnames";

type Props = {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "base"
    | "info"
    | "success"
    | "warning"
    | "error";
};

const progress: number[] = [1, 3, 6, 8, 9];

const colorMap = {
  primary: "progress-primary",
  secondary: "progress-secondary",
  accent: "progress-accent",
  neutral: "progress-neutral",
  base: "progress-base",
  info: "progress-info",
  success: "progress-success",
  warning: "progress-warning",
  error: "progress-error",
};

const LoadingBar: FC<Props> = ({ color = "primary" }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + progress[Math.floor(Math.random() * progress.length)];
      });
    }, 250);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      className={`progress ${colorMap[color]} transition-all delay-150 ease-in`}
      value={percent}
      max="100"
    />
  );
};

export default LoadingBar;
