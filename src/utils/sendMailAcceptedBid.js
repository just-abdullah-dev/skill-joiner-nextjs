import { sendMail } from "./sendMail";

export function sendMailAcceptedBid(email, title, clientName, stdName){
    try {
        const message = `
        <br><b>Dear ${stdName},</b>
        <br>${clientName} just accepted your bid. 
        <br>Title of job post : <b>${title}</b>.
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, "Your Bid Has Been Accepted. 🎉🥳", message);

        return otp;
    } catch (error) {
        console.error(error)
    }
}
