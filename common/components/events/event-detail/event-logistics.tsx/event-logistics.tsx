import AddressIcon from "../../../icons/address";
import DateIcon from "../../../icons/date";
import LogisticsItem from "../logistics-item/logistics-item";
import classes from "./event-logistics.module.scss";

type Props = {
  date: string;
  address: string;
  image: string;
  imageAlt: string;
};
const EventLogistics = ({ date, address, image, imageAlt }: Props) => {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const addressText = address.replace(", ", "\n");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`/${image}`} alt={imageAlt} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
};

export default EventLogistics;
