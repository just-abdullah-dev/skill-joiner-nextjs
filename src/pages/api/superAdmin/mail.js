import { sendOtp } from "@/utils/sendOtp";

export default async function (req, res){
    const otp = sendOtp('abdulhaseeb9274@gmail.com');
    res.send(`Email has been sent!. Code is : ${otp}`)
}
