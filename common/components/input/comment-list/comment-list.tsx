import styles from "./comment-list.module.scss";

type Data = {
  _id: string;
  name: string;
  text: string;
};

type Props = {
  items: Data[];
};

function CommentList({ items }: Props) {
  return (
    <ul className={styles.comments}>
      {items.map(item => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
