import nodemailer from 'nodemailer';
// SOL_PRIVATE_KEY=""
// SMTP_USERNAME=""
// SMTP_PASSWORD=""
// SMTP_ENDPOINT

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function sendEmail(to: string, body: string) {
    await transport.sendMail({
        from: 'milankatira26@gmail.com',
        sender: 'milankatira07@gmail.com',
        to,
        subject: 'Hello from Zapier',
        text: body,
    });
}
