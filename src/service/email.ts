export const sendEmail = async (userEmail: string, analysis: string) => {
  const subject = `Your LinkedIn profile has been scraped`;
  const htmlContent = `
      <html>
        <head></head>
        <body>
          <p>Hello,</p>
          <p>Your LinkedIn profile has been successfully scraped and processed.</p>
          <p>We've analyzed your personality and generated insights based on your profile data.</p>
          <p>Thank you for using our service!</p>
        </body>
      </html>
    `;

  const emailData = {
    sender: {
      name: "Yajat @ ResonanceHQ",
      email: "noreply@resonancehq.dev",
    },
    to: [
      {
        email: userEmail,
        name: "User",
      },
    ],
    subject: subject,
    htmlContent: htmlContent,
  };

  try {
    const apiKey = process.env.BREVO_API_KEY;
    console.log(apiKey);
    if (!apiKey) {
      throw new Error("BREVO_API_KEY is not set");
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

const template = {
  "profile-scraped": () => {},
  stats: () => {},
};
