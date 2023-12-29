import { sendMail } from "./sendMail";

export function sendMailOrderDelivered(email, clientName, stdName, title, link){
    try {
        const message = `
        <br><b>Dear ${clientName},</b>
        <br>${stdName} just delivered your order.
        <br>Title of order : <a href="${link}"><b>${title}</b></a>.
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, "Update on your order.", message);
        return null;
    } catch (error) {
        console.error(error)
    }
}
