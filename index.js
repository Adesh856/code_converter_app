// server.js
const express = require('express');
const cors = require('cors');
const bodyParser=require("body-parser")
const dotenv = require('dotenv');
const {createCompletionChatGTP} = require("./chatgpt")
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.post('/api/convert-code', async (req, res) => {
  try {
    const { code, language } = req.body;
    const prompt = `Act like a Code converter .Convert this ${code} in this ${language} code`;
    const { data } = await createCompletionChatGTP({
      message:prompt,
    });
    const convertedCode = data.choices[0].text.trim();
    console.log(convertedCode)
    res.json({ convertedCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
app.post('/api/debug', async (req, res) => {
  try {
    const { code } = req.body;
    const prompt = `Act like a debugger .Debug this ${code} provide me what's error in this code in bullet points in promide me output in string format`;
    const { data } = await createCompletionChatGTP({
      message:prompt,
    });
    const convertedCode = data.choices[0].text.trim();
    console.log(convertedCode)
    res.json({ convertedCode });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
app.post('/api/quality', async (req, res) => {
  try {
    const { code } = req.body;
    const prompt = `Act like a QA Engineer .Rate this ${code} as per the quality of code and provide me some measure should take care off plot output in a bullet points `;
    const { data } = await createCompletionChatGTP({
      message:prompt,
    });
    const convertedCode = data.choices[0].text.trim();
    console.log(convertedCode)
    res.json({ convertedCode });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});