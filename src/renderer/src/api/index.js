import OpenAI from 'openai'

const API_KEY = import.meta.env.VITE_API_KEY
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true
})

export const postMessage = async (text) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'system', content: text }],
    model: 'deepseek-chat'
  })
  return completion?.choices[0]?.message?.content
}
