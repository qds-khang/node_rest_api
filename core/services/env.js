module.exports = {
    APP_ENV: process.env.APP_ENV,
    APP_URL: process.env.APP_URL,
    MONGO_URL: process.env.MONGO_URL,
    SITE_SECRET_KEY: process.env.SITE_SECRET_KEY,
    EMAIL: {
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_SECURE: process.env.EMAIL_SECURE,
        EMAIL_AUTH_USER: process.env.EMAIL_AUTH_USER,
        EMAIL_AUTH_PASS: process.env.EMAIL_AUTH_PASS
    },
    FACEBOOK: {
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
        FACEBOOK_CALLBACK_URL: process.env.FACEBOOK_CALLBACK_URL
    },
    GOOGLE: {
        GOOGLE_ID: process.env.GOOGLE_ID,
        GOOGLE_SECRET: process.env.GOOGLE_SECRET,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL
    },
    TWITTER: {
        TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
        TWITTER_CALLBACK_URL: process.env.TWITTER_CALLBACK_URL
    }
};