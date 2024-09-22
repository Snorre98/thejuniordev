import { Children } from "../../../../types";
import styles from "./Bezel.module.scss";
import {useStore} from "../../../../store"

type BezelProps = {
  children?: Children;
};

export function Bezel({ children }: BezelProps) {
  const { setScreen } = useStore();

  const handleLock = () => {
    setScreen('lock');
  };

  return (
    <div className={styles.bezelWrapper}>
        <div className={styles.bezel}>
          <span className={styles.notch} />
            {children}
        </div>
        <span className={styles.lockButton} onClick={handleLock}/>
    </div>
  );
}
