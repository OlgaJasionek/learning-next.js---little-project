import Button from "../../ui/button/button";
import styles from "./results-title.module.scss";

type Props = {
  date: Date;
};

const ResultsTitle = ({ date }: Props) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={styles.title}>
      <h1 className={styles.margin}>Events in {humanReadableDate}</h1>
      <Button link='/events'>Show all events</Button>
    </section>
  );
};

export default ResultsTitle;
