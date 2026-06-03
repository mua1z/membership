const OpenAI = require('openai');

let _groqClient = null;

/**
 * Returns the Groq client, creating it lazily on first call.
 * Throws a descriptive error if GROQ_API_KEY is not configured,
 * rather than crashing the entire server at startup.
 */
function getGroqClient() {
  if (_groqClient) return _groqClient;

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GROQ_API_KEY environment variable is not set. ' +
      'Add it in your Render dashboard under Environment → Environment Variables.'
    );
  }

  _groqClient = new OpenAI({
    apiKey,
    baseURL: 'https://api.groq.com/openai/v1'
  });

  return _groqClient;
}

// Export a Proxy so that existing code using groq.chat.completions.create(...)
// works without any changes — the real client is created on first property access.
module.exports = new Proxy({}, {
  get(_, prop) {
    return getGroqClient()[prop];
  }
});
