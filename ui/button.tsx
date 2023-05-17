import classNames from "classnames";
import * as React from "react";
import styles from "./button.module.scss";
import { LoadingIcon } from "./icons";

export function Button({
  loading,
  children,
  className,
  ...props
}: JSX.IntrinsicElements["button"] & { loading?: boolean }) {
  const buttonClasses = classNames(styles.button, {
    [className!]: className,
  });
  return (
    <button className={buttonClasses} {...props}>
      {loading && <LoadingIcon className={styles.icon} />}
      <span>{children}</span>
    </button>
  );
}
