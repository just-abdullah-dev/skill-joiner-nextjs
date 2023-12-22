import { sendMail } from "./sendMail";

export function sendMailRecieveRequest(email, title, clientName, stdName){
    try {
        const message = `
        <br><b>Dear ${stdName},</b>
        <br>${clientName} just requested you to for <b>${title}</b>.
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, "You just received a service request. 🎉🥳", message);
        return null;
    } catch (error) {
        console.error(error)
    }
}

