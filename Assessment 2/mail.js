import nodemailer from 'nodemailer';


export async function sendEmail(recipient, event) {
    try {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '', //fill
                pass: '', //fill
            },
        });

        //customized content of the email, not given by the user directly
        const mailOptions = {
            from: 'testingtestingtestinggnitset@gmail.com',
            to: recipient,
            subject: `Successfully signed up for ${event.title}`,
            text: `
                Signed up for the event: ${event.title}.
                
                Details:
                - Title: ${event.title}
                - Description: ${event.description}
                - Start Date: ${event.start_date}
                - End Date: ${event.end_date}
                - Location: ${event.location}
            `,
        };

        //send email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${recipient}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
