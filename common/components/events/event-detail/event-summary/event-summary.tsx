import styles from "./event-summary.module.scss";

type Props = {
  title: string;
};

const EventSummary = ({ title }: Props) => {
  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
};

export default EventSummary;
