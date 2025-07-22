// app.js – връзка между фронтенда и AI сървъра (напр. телефон с ngrok или Proxy Shield)

async function askNishAI() {
  const prompt = document.getElementById('prompt').value.trim();
  const resultDiv = document.getElementById('result');

  if (!prompt) {
    resultDiv.textContent = "⚠️ Please enter a question for NishAI.";
    return;
  }

  resultDiv.textContent = '⏳ Thinking...';

  try {
    const response = await fetch('https://YOUR-NGROK-URL.ngrok.io/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message?.content || '🤷 Unexpected response.';
    resultDiv.textContent = message;

  } catch (error) {
    console.error('Error:', error);
    resultDiv.textContent = '❌ Error talking to NishAI: ' + error.message;
  }
}

