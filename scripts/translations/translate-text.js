require('dotenv').config();
// ENV VAR REQUIREMENTS (automatically detected by AWS SDK)
// AWS_ACCESS_KEY_ID
// AWS_SECRET_ACCESS_KEY


const { TranslateClient, TranslateTextCommand } = require("@aws-sdk/client-translate");



const translateText = async (text, targetLanguageCode) => {
    const translateClient = new TranslateClient({
        region: 'us-east-1',
    });

    const params = {
        SourceLanguageCode: "en",
        TargetLanguageCode: targetLanguageCode,
        Text: text,

    };

    try {
        const data = await translateClient.send(new TranslateTextCommand(params));
        return data.TranslatedText;
    } catch (err) {
        console.log("Error", err);
        return null;
    }
}

module.exports = {
    translateText
}
