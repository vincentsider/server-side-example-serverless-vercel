import { VercelRequest, VercelResponse } from "@vercel/node";
import { VapiPayload, VapiWebhookEnum } from "../../types/vapi.types";
import { assistantRequestHandler } from "./.assistantRequest";
import { endOfCallReportHandler } from "./.endOfCallReport";
import { functionCallHandler } from "./.functionCall";
import { speechUpdateHandler } from "./.speechUpdateHandler";
import { statusUpdateHandler } from "./.statusUpdate";
import { transcriptHandler } from "./.transcript";
import { HangEventHandler } from "./.hang";
// import { setCors } from "../../utils/cors.utils";

// A utility function to set CORS headers
function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', 'https://dashboard.vapi.ai'); // Adjust according to your needs
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

export default async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers for all incoming requests
  setCors(res);

  // Immediately respond to OPTIONS method (preflight request) with success
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Process POST requests
  if (req.method === "POST") {
    const conversationUuid = req.query.conversation_uuid as string;

    if (conversationUuid) {
      console.log("Conversation UUID:", conversationUuid);
    }
    try {
      const payload = req.body.message as VapiPayload;
      console.log("type", payload.type, payload);
      switch (payload.type) {
        case VapiWebhookEnum.FUNCTION_CALL:
          return res.status(201).json(await functionCallHandler(payload));
        case VapiWebhookEnum.STATUS_UPDATE:
          return res.status(201).json(await statusUpdateHandler(payload));
        case VapiWebhookEnum.ASSISTANT_REQUEST:
          return res.status(201).json(await assistantRequestHandler(payload));
        case VapiWebhookEnum.END_OF_CALL_REPORT:
          return res.status(201).json(await endOfCallReportHandler(payload));
        case VapiWebhookEnum.SPEECH_UPDATE:
          return res.status(201).json(await speechUpdateHandler(payload));
        case VapiWebhookEnum.TRANSCRIPT:
          return res.status(201).json(await transcriptHandler(payload));
        case VapiWebhookEnum.HANG:
          return res.status(201).json(await HangEventHandler(payload));
        default:
          throw new Error(`Unhandled message type`);
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  else {
    // Respond with 405 Method Not Allowed for methods other than POST or OPTIONS
    return res.status(405).send("Method Not Allowed");
  }
};
