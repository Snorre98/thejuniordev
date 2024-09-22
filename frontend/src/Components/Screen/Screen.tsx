import { ReactNode } from "react";
import { Bezel, Line } from "./components";
import styles from "./Screen.module.scss";

export interface ScreenProps {
  children?: ReactNode;
  onPullUp?: () => void;
  onUnlock?: () => void;
  onBack?: () => void;
}

export function Screen({
  children,
  onPullUp,
  // onUnlock,
  // onBack,
}: ScreenProps) {

  return (
    <>
    
    <Bezel>
      <div
      className={styles.screen}
      >
        {children}
        {
          onPullUp && (
            <Line onPullUp={onPullUp} />
          )
        }
       
      </div>
    </Bezel>
    {/* <div>
      {onPullUp && (
          <button className={styles.pullUpButton} onClick={onPullUp}>
            Pull Up
          </button>
        )}
        {onUnlock && (
          <button className={styles.unlockButton} onClick={onUnlock}>
            Unlock
          </button>
        )}
        {onBack && (
          <button className={styles.backButton} onClick={onBack}>
            Back
          </button>
        )}
    </div> */}
    </>
  );
}