import { sendMail } from "./sendMail";

export function sendMailRequestRejected(email, title, clientName, stdName){
    try {
        const message = `
        <br><b>Dear ${clientName},</b>
        <br>${stdName} declined your service request. 
        <br>Kindly visit other similar user profiles for your work. 
        <br>Title of service request : <b>${title}</b>.
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, `Update on Your Request. ${title}`, message);
        return null;
    } catch (error) {
        console.error(error)
    }
}
