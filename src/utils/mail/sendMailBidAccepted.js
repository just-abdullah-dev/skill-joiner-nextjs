import { sendMail } from "./sendMail";

export function sendMailBidAccepted(email, title, clientName, stdName){
    try {
        const message = `
        <br><b>Dear ${stdName},</b>
        <br>${clientName} just accepted your bid. 
        <br>Title of job post : <b>${title}</b>.
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, "Your Bid Has Been Accepted. 🎉🥳", message);
        return null;
    } catch (error) {
        console.error(error)
    }
}
