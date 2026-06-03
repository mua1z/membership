const OpenAI = require('openai');

let _openaiClient = null;

function getOpenAIClient() {
  if (_openaiClient) return _openaiClient;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OPENAI_API_KEY environment variable is not set. ' +
      'Add it in your Render dashboard under Environment → Environment Variables.'
    );
  }

  _openaiClient = new OpenAI({ apiKey });
  return _openaiClient;
}

module.exports = new Proxy({}, {
  get(_, prop) {
    return getOpenAIClient()[prop];
  }
});
