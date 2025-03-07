const config = require("../config/config");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(config.GEMINI_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const review = async (req, res, next) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Code is required in the request body" });
        }

        // System Instructions for AI
        const systemInstructions = `
            You are an expert code reviewer. 
            Provide clear, constructive feedback on the provided code.
            Focus on:
            - Code quality, readability, and maintainability
            - Best practices and potential improvements
            - Security concerns, performance optimizations, and potential bugs
            Keep the response concise but informative.
            and output should be in .md structure
        `;

        // Combining system instructions and prompt
        const prompt = `
            ${systemInstructions}
            ---
            Review the following code:
            \`\`\`javascript
            ${code}
            \`\`\`
        `;

        const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
        const text = result.response.text();

        req.review = text;
        next();
    } catch (error) {
        console.error("Error generating AI response:", error);
        res.status(500).json({ error: "Failed to process AI review" });
    }
};

module.exports = review;
