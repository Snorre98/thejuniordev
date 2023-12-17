import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar";
import styles from "./JrOutlet.module.scss";

export function JrOutlet() {
  return (
    <>
      <Navbar />
      <div className={styles.navbar_outlet}>
        <Outlet />
      </div>
      {/* footer */}
    </>
  );
}
