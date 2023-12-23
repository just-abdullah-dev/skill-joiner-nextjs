import { sendMail } from "./sendMail";
function generateOTP() {
    const min = 100000; 
    const max = 999999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export function sendOtp(email){
    try {
        const otp = generateOTP();
        const message = `
        <br>Your OTP code is: <b>${otp}</b>.
        <br>Use this code to verify your identity.
        <br>Regards,
        <br><b>Skill Joiner</b>`;

        sendMail(email, "OTP Code", message);

        return otp;
    } catch (error) {
        console.error(error)
    }
}
