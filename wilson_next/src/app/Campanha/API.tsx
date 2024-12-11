import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { campaign } = req.query;

    const response = await fetch(`http://localhost:5000/recipients?campaign=${campaign}`);
    const data = await response.json();

    res.status(200).json(data);
}
