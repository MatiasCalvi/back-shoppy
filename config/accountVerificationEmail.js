const { createTransport } = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const {
  GOOGLE_ID,
  GOOGLE_REFRESH,
  GOOGLE_SECRET,
  GOOGLE_URL,
  GOOGLE_USER,
  BACK_URL,
} = process.env;

function createClient() {
  return new OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
}

function getTransport(client) {
  const accessToken = client.getAccessToken();
  return createTransport({
    service: "gmail",
    auth: {
      user: GOOGLE_USER,
      type: "OAuth2",
      clientId: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
      refreshToken: GOOGLE_REFRESH,
      accessToken: accessToken,
    },
    tls: { rejectUnauthorized: false },
  });
}

function getEmailBody(email, code, host) {
  return `
        <div>
          <p>
            Hello ${email}Thank you for creating a account. To complete the registration process.
          </p>
          <p>
            Verifying your e-mail address ensures that only you have access to your
            account information.
          </p>
          <p>
            To confirm your email address, click on the link below:
            <br>
            <br /> Click this link: 
              <a href="${host}/api/auth/verify/${code}">
                ${host}/api/auth/verify/${code}
              </a>
          </p>
          <p>Thank you!</p>
          <p>Sincerely,</p>
          <p>MyTinerary - Team LeeroyJenkins</p>
        </div>
    `;
}

const accountVerificationEmail = async (email, code) => {
  const client = createClient();
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH });
  const transport = getTransport(client);
  const emailOptions = {
    from: GOOGLE_USER,
    to: email,
    subject: "Verify your new account in Amazing Events",
    html: getEmailBody(email, code, BACK_URL),
  };
  await transport.sendMail(emailOptions, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log("Email sent!");
  });
};

module.exports = accountVerificationEmail;
