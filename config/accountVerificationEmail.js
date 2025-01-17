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
       
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
<meta name=x-apple-disable-message-reformatting>
<meta http-equiv=X-UA-Compatible>
<meta charset=utf-8>
<meta name=viewport content=target-densitydpi=device-dpi>
<meta content=true name=HandheldFriendly>
<meta content=width=device-width name=viewport>
<style type="text/css">
table {
border-collapse: separate;
table-layout: fixed;
mso-table-lspace: 0pt;
mso-table-rspace: 0pt
}
table td {
border-collapse: collapse
}
.ExternalClass {
width: 100%
}
.ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
line-height: 100%
}
* {
line-height: inherit;
text-size-adjust: 100%;
-ms-text-size-adjust: 100%;
-moz-text-size-adjust: 100%;
-o-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale
}
html {
-webkit-text-size-adjust: none !important
}
img+div {
display: none;
display: none !important
}
img {
Margin: 0;
padding: 0;
-ms-interpolation-mode: bicubic
}
h1, h2, h3, p, a {
font-family: inherit;
font-weight: inherit;
font-size: inherit;
line-height: 1;
color: inherit;
background: none;
overflow-wrap: normal;
white-space: normal;
word-break: break-word
}
a {
color: inherit;
text-decoration: none
}
h1, h2, h3, p {
min-width: 100%!important;
width: 100%!important;
max-width: 100%!important;
display: inline-block!important;
border: 0;
padding: 0;
margin: 0
}
a[x-apple-data-detectors] {
color: inherit !important;
text-decoration: none !important;
font-size: inherit !important;
font-family: inherit !important;
font-weight: inherit !important;
line-height: inherit !important
}
a[href^="mailto"],
a[href^="tel"],
a[href^="sms"] {
color: inherit !important;
text-decoration: none !important
}
@media only screen and (min-width: 481px) {
.hd { display: none!important }
}
@media only screen and (max-width: 480px) {
.hm { display: none!important }
}
[style*="Fira Sans"] {font-family: 'Fira Sans', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;} [style*="Montserrat"] {font-family: 'Montserrat', BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif !important;}
@media only screen and (min-width: 481px) {.t11,.t9{padding-bottom:100px!important}.t22{mso-line-height-alt:40px!important;line-height:40px!important}.t24{padding-bottom:40px!important;border-top-left-radius:inherit!important;border-top-right-radius:inherit!important}.t29{border-top-left-radius:inherit!important;border-top-right-radius:inherit!important;padding-bottom:40px!important}.t30{line-height:52px!important;font-size:48px!important;mso-text-raise:1px!important}.t32{mso-line-height-alt:28px!important;line-height:28px!important}.t40{line-height:28px!important;font-size:18px!important}.t42{mso-line-height-alt:50px!important;line-height:50px!important}.t50{line-height:28px!important;font-size:18px!important}.t54,.t59{line-height:48px!important;mso-text-raise:11px!important}.t60{line-height:48px!important;font-size:13px!important;mso-text-raise:11px!important}.t62{line-height:48px!important;mso-text-raise:11px!important}.t69,.t71{padding-top:80px!important;padding-bottom:80px!important}.t82{mso-line-height-alt:40px!important;line-height:40px!important}.t84{padding-bottom:60px!important;border-top-left-radius:inherit!important;border-top-right-radius:inherit!important}.t89{border-top-left-radius:inherit!important;border-top-right-radius:inherit!important;padding-bottom:60px!important}}
</style>
<!--[if !mso]><!-->
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600;700&family=Montserrat:wght@800&display=swap" rel="stylesheet" type="text/css">
<!--<![endif]-->
<!--[if mso]>
<style type="text/css">
.t11,.t9{padding-bottom:100px !important}.t22{mso-line-height-alt:40px !important;line-height:40px !important}.t24{padding-bottom:40px !important;border-top-left-radius:inherit !important;border-top-right-radius:inherit !important}.t29{border-top-left-radius:inherit !important;border-top-right-radius:inherit !important;padding-bottom:40px !important}.t30{line-height:52px !important;font-size:48px !important;mso-text-raise:1px !important}.t32{mso-line-height-alt:28px !important;line-height:28px !important}.t40{line-height:28px !important;font-size:18px !important}.t42{mso-line-height-alt:50px !important;line-height:50px !important}.t50{line-height:28px !important;font-size:18px !important}.t54,.t59{line-height:48px !important;mso-text-raise:11px !important}.t60{line-height:48px !important;font-size:13px !important;mso-text-raise:11px !important}.t62{line-height:48px !important;mso-text-raise:11px !important}.t69,.t71{padding-top:80px !important;padding-bottom:80px !important}.t82{mso-line-height-alt:40px !important;line-height:40px !important}.t84{padding-bottom:60px !important;border-top-left-radius:inherit !important;border-top-right-radius:inherit !important}.t89{border-top-left-radius:inherit !important;border-top-right-radius:inherit !important;padding-bottom:60px !important}
</style>
<![endif]-->
<!--[if mso]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
</head>
<body class=t0 style="min-width:100%;Margin:0px;padding:0px;background-color:#EDEDED;"><div class=t1 style="background-color:#EDEDED;"><table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td class=t101 style="font-size:0;line-height:0;mso-line-height-rule:exactly;" valign=top align=center>
<!--[if mso]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
<v:fill color=#EDEDED />
</v:background>
<![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0 border=0 align=center><tr><td>
<table class=t10 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
<!--[if !mso]><!--><td class=t11 style="background-color:#FFFFFF;overflow:hidden;width:620px;padding:60px 30px 70px 30px;">
<!--<![endif]-->
<!--[if mso]><td style="background-color:#FFFFFF;overflow:hidden;width:680px;padding:60px 30px 70px 30px;"><![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
<table class=t19 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t20 style="background-color:unset;overflow:hidden;width:475px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
<table class=t23 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t24 style="border-bottom:1px solid #E1E2E6;overflow:hidden;width:475px;padding:0 0 30px 0;"><h1 class=t30 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';line-height:38px;font-weight:700;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;direction:ltr;color:#404040;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Verify your account.</h1></td>
</tr></table>
</td></tr><tr><td><div class=t22 style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class=t33 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t34 style="overflow:hidden;width:475px;"><p class=t40 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';line-height:26px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#9095A2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Hello, ${email}! Welcome to Shoppy.</p></td>
</tr></table>
</td></tr><tr><td><div class=t32 style="mso-line-height-rule:exactly;mso-line-height-alt:18px;line-height:18px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class=t43 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t44 style="overflow:hidden;width:475px;"><p class=t50 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';line-height:26px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#9095A2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Please tap the button below to verify your account.</p></td>
</tr></table>
</td></tr><tr><td><div class=t42 style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class=t53 role=presentation cellpadding=0 cellspacing=0 align=left><tr><td class=t54 style="background-color:#CC1B1B;overflow:hidden;width:246px;text-align:center;line-height:46px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:40px 40px 40px 40px;"><a class=t60 href="${host}/auth/verify/${code}" style="display:block;font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Montserrat';line-height:46px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target=_blank>Verify</a></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr><tr><td>
<table class=t70 role=presentation cellpadding=0 cellspacing=0 align=center><tr>
<!--[if !mso]><!--><td class=t71 style="background-color:#1C1C1C;overflow:hidden;width:620px;padding:60px 30px 60px 30px;">
<!--<![endif]-->
<!--[if mso]><td style="background-color:#1C1C1C;overflow:hidden;width:680px;padding:60px 30px 60px 30px;"><![endif]-->
<table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
<table class=t79 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t80 style="background-color:unset;overflow:hidden;width:475px;"><table role=presentation width=100% cellpadding=0 cellspacing=0><tr><td>
<table class=t83 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t84 style="border-bottom:1px solid #262626;overflow:hidden;width:600px;padding:0 0 40px 0;"><h1 class=t90 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';line-height:32px;font-weight:600;font-style:normal;font-size:32px;text-decoration:none;text-transform:none;direction:ltr;color:#FFFFFF;text-align:left;mso-line-height-rule:exactly;">Shoppy.</h1></td>
</tr></table>
</td></tr><tr><td><div class=t82 style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
<table class=t93 role=presentation cellpadding=0 cellspacing=0 align=center><tr><td class=t94 style="overflow:hidden;width:600px;"><p class=t100 style="font-family:BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif, 'Fira Sans';line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#9095A2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">Shoppy Ecommerce. All rights reserved</p></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr></table></td>
</tr></table>
</td></tr></table></td></tr></table></div></body>
</html>
  
`;
}

const accountVerificationEmail = async (email, code) => {
  const client = createClient();
  client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH });
  const transport = getTransport(client);
  const emailOptions = {
    from: GOOGLE_USER,
    to: email,
    subject: "Verify your new account in Shoppy",
    html: getEmailBody(email, code, BACK_URL),
  };
  await transport.sendMail(emailOptions, (error, response) => {
    if (error) {
      console.error(error);
      return;
    }

  });
};

module.exports = accountVerificationEmail;
