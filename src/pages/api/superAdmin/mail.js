import { sendOtp } from "@/utils/sendOtp";

export default async function (req, res){
    const otp = sendOtp('b22f1231se145@fecid.paf-iast.edu.pk');
    res.send(`Email has been sent!. Code is : ${otp}`)
}