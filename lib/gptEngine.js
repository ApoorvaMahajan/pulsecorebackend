import fetch from 'node-fetch';

export async function generateNudges(data) {
  try {
    const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistral-tiny', // or 'mistral-small' / 'mistral-medium' if your tier supports
        messages: [
          {
            role: 'system',
            content: 'You are an M&A execution analyst.'
          },
          {
            role: 'user',
            content: `Analyze this deal engagement data and return 3 risk insights with severity and action.\n\nData: ${JSON.stringify(data)}`
          }
        ]
      })
    });

    const result = await response.json();

    if (result.choices && result.choices[0].message.content) {
      return JSON.parse(result.choices[0].message.content);
    } else {
      throw new Error('Invalid Mistral API response');
    }
  } catch (error) {
    console.error('Mistral API Error:', error.message);
    return null;
  }
}