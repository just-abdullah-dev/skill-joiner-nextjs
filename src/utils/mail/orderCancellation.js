import { sendMail } from "./sendMail";

export default function sendMailOrderCancellation(email, reason, jobTitle, clientName, stdName){
    try {
        const message = `
        <br><b>Dear ${clientName},</b>
        <br>${stdName} cancelled your order of having title ${jobTitle} due to following reason: 
        <br><i>${reason}</i>. 
        <br>Kindly visit other similar profiles for your work. 
        <br>Regards,
        <br>Skill Joiner`;

        sendMail(email, `Update on Your Order.`, message);
        return null;
    } catch (error) {
        console.error(error)
    }
}
