import { sendMail } from "./sendMail";

export function sendMailRequestAccepted(email, title, clientName, stdName){
    try {
        const message = `
        <br><b>Dear ${clientName},</b>
        <br>${stdName} just accepted your service request. 
        <br>Title of service request : <b>${title}</b>.
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, "Your Service Request Has Been Accepted. 🎉🥳", message);
        return null;
    } catch (error) {
        console.error(error)
    }
}
