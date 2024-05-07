import { VercelRequest, VercelResponse } from "@vercel/node";
import OpenAI from "openai";
import { envConfig } from "../../config/env.config";
import { setCors } from "../../utils/cors.utils";

const openai = new OpenAI({ apiKey: envConfig.openai.apiKey });

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Not Found" });
  }

  setCors(res);

  try {
    const {
      model,
      messages,
      max_tokens,
      temperature,
      call,
      stream,
      metadata,
      ...restParams
    } = req.body;

    console.log(req.body);

    if (stream) {
      const completionStream = await openai.chat.completions.create({
        model: model || "gpt-3.5-turbo-1106",
        ...restParams,
        messages,
        max_tokens: max_tokens || 500,
        temperature: temperature || 0.3,
        stream: true,
      } as OpenAI.Chat.ChatCompletionCreateParamsStreaming);

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const data of completionStream) {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
      }
      res.end();
    } else {
      const completion = await openai.chat.completions.create({
        model: model || "gpt-3.5-turbo-1106",
        ...restParams,
        messages,
        max_tokens: max_tokens || 500,
        temperature: temperature || 0.3,
        stream: false,
      });
      return res.status(200).json(completion);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};
