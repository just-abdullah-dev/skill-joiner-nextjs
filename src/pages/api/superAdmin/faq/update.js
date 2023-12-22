import connectDB from '@/config/db';
import errorHandler from '@/middleware/errorHandler';
import { reqMethodError } from '@/utils/reqError';
import { adminAuthGuard } from '@/middleware/adminMiddlewares';
import FAQ from '@/models/faq';


const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        return reqMethodError(res, 'PUT');
    }
    try {
        await connectDB();
        await adminAuthGuard(req, res);
        if(!req.user?._id){
            return;
        }
        const { question, answer, id } = req.body;
        let faq = await FAQ.findById(id);
        faq.question = question;
        faq.answer = answer;
        await faq.save();
        res.status(200).json({
            success: true, data: faq,
            message: 'Question has been updated successfully'
        });


    } catch (error) {
        console.error('Error processing request:', error);
        return errorHandler(res, 500, error.message);
    }
};

export default handler;
