// Rename to `config.js`;

module.exports = {
    PORT: 3000, // port that app will listen to connections on.
    sensorId: null, // id of PurpleAir sensor that you're interested in.

    /**
     * Set the map URL for your local area to view air sensors relevant
     * to you. This is used for generating link when clicking on the
     * "PurpleAir Map link inside the renderHtml method.
     */
    mapUrl: 'https://www.purpleair.com/map?opt=1/mAQI/a10/cC0#8.85/37.7435/-122.3694',

    /**
     * Enter SMS Relay Email Address for text message or normal
     * email address if preferred. You can find your SMS gateway
     * address here: https://www.digitaltrends.com/mobile/how-to-send-a-text-from-your-email-account/
     *
     * Multiple email addresses and / or SMS Email Relays can be added.
     * Seperate addresses with a comma.
     */
    email: {
        enabled: false, // Change to true when ready for notifications.
        EMAIL_TO: '',
        EMAIL_FROM: '',
        EMAIL_PASSWORD: '',
        EMAIL_HOST: '',
        EMAIL_PORT: ''
    }
};
