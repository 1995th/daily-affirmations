import { TextServiceClient } from '@google/generative-ai';

// Configure the API key
const API_KEY = "API KEY HERE"; // Replace with your actual Gemini API key

// Initialize the client
const client = new TextServiceClient({ apiKey: API_KEY });

document.getElementById("generateBtn").addEventListener("click", async () => {
  const mood = document.getElementById("mood").value;
  const affirmationElement = document.getElementById("affirmation");

  affirmationElement.textContent = "Generating... ✨";

  try {
    // Call the Gemini API for a text completion
    const response = await client.generateMessage({
      model: 'models/text-bison-001', // Ensure this matches the model you have access to
      prompt: {
        context: `Generate a daily affirmation for someone feeling ${mood}.`,
      },
      temperature: 0.7, // Adjust creativity level
    });

    if (response && response.candidates && response.candidates.length > 0) {
      affirmationElement.textContent = response.candidates[0].content.trim();
    } else {
      affirmationElement.textContent = "No affirmation generated. Please try again.";
    }
  } catch (error) {
    affirmationElement.textContent = "Error generating affirmation. Please try again.";
    console.error("Error:", error);
  }
});