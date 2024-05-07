export const envConfig = {
  weather: {
    baseUrl:
      process.env.WEATHER_BASE_URL ?? `https://api.openweathermap.org/data/2.5`,
    apiKey: process.env.WEATHER_API_KEY ?? ``,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY ?? `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`,
  },
  vapi: {
    baseUrl: process.env.VAPI_BASE_URL ?? "https://api.vapi.ai",
    apiKey: process.env.VAPI_API_KEY ?? "3945f32f-eda3-4a82-8979-f1b49fd479d3",
  },
};
