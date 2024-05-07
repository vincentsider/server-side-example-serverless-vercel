export const envConfig = {
  weather: {
    baseUrl:
      process.env.WEATHER_BASE_URL ?? ``,
    apiKey: process.env.WEATHER_API_KEY ?? ``,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? ``,
  },
  vapi: {
    baseUrl: process.env.VAPI_BASE_URL ?? "",
    apiKey: process.env.VAPI_API_KEY ?? "",
  },
};
