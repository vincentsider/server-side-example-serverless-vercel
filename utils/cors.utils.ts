import { VercelResponse } from "@vercel/node";

export const setCors = (res: VercelResponse) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // Specify your origin instead of using '*'
  res.setHeader("Access-Control-Allow-Origin", "https://dashboard.vapi.ai");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,POST,PATCH,DELETE,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
};

