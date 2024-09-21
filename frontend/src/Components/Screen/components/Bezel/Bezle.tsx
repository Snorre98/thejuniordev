import { Children } from "../../../../types";
import styles from "./Bezel.module.scss";

type BezelProps = {
  children?: Children;
};

export function Bezel({ children }: BezelProps) {
  return (
    <div className={styles.bezel}>
      <span className={styles.notch} />
      {children}
    </div>
  );
}
