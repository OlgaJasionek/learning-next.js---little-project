import { NextApiRequest, NextApiResponse } from "next";
import {
  connectDataBase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

type BaseComment = {
  email: string;
  name: string;
  text: string;
  eventId: string | string[] | undefined;
};

type CreateCommentDto = BaseComment;
type Comment = BaseComment & { id: string };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const eventId = req.query.eventId;
  const client = await connectDataBase();
  let result;

  if (req.method === "POST") {
    const { email, name, text } = JSON.parse(req.body);

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const newComment: CreateCommentDto = {
      email,
      name,
      text,
      eventId,
    };

    try {
      result = await insertDocument(client, "comments", newComment);

      const createdComment: Comment = {
        ...newComment,
        id: result.insertedId.toString(),
      };
      res
        .status(201)
        .json({ message: "Added comment", comment: createdComment });
    } catch (err) {
      res.status(500).json({ message: "Connecting with database failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const commentList = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId }
      );
      res.status(200).json({ comments: commentList });
    } catch (err) {
      res.status(500).json({ message: "Getting comments failed!" });
    }

    client.close;
  }
};

export default handler;
