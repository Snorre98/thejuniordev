import styles from "./Line.module.scss";

type LineProps = {
  id?: string;
};
export function Line({ id }: LineProps) {
  return (
    <>
      <span className={styles.line} id={id} />
    </>
  );
}
