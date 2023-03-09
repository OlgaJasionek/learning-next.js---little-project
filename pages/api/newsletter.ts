import { NextApiRequest, NextApiResponse } from "next";
import { connectDataBase, insertDocument } from "../../helpers/db-util";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const email: string = req.body.email;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
    }

    try {
      const client = await connectDataBase();
      await insertDocument(client, "newsletter", { email });
      client.close;
    } catch (err) {
      res.status(500).json({ message: "Connecting with database failed !" });
      return;
    }

    res.status(201).json({ message: "Signed up" });
  }
};

export default handler;
