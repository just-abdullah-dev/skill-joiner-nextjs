import { sendMail } from "./sendMail";

export function sendMailOrderRevision(email, clientName, stdName, title, link){
    try {
        const message = `
        <br><b>Dear ${stdName},</b>
        <br>${clientName} requested for a revision.
        <br>Title of order : <a href="${link}"><b>${title}</b></a>.
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, "Update on your delivered order.", message);
        return null;
    } catch (error) {
        console.error(error)
    }
}
