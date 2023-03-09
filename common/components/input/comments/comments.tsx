import { useEffect, useState } from "react";
import CommentList from "../comment-list/comment-list";
import NewComment from "../new-comment/new-comment";

import styles from "./comments.module.scss";

type Data = {
  email: string;
  name: string;
  text: string;
};

type ApiData = {
  id: string;
  name: string;
  text: string;
};

type Props = {
  eventId: string;
};

function Comments({ eventId }: Props) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<ApiData[]>([]);

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then(response => response.json())
        .then(data => {
          setComments(data.comments);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  function addCommentHandler(commentData: Data) {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
