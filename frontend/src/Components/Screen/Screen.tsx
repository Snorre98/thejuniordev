// import classNames from "classnames";
import { Children } from "../../types";
import styles from "./Screen.module.scss";

type ScreenProps = {
  children?: Children;
};

export function Screen({ children }: ScreenProps) {
  return (
    <div className={styles.bezel}>
      <span className={styles.notch} />
      {children}
    </div>
  );
}
