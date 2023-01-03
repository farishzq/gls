//api for leave
import dbConnect from "@/lib/NewDBConnect";
import UserLeaveTypes from "@/model/Ltypes"

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        //GET - baca data profile
        case 'GET':
            try {
                const leavetypes = await UserLeaveTypes.find({});
                res.status(200).json({ success: true, data: leavetypes })
            }
            catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        //GET - tambah profile baru
        case 'POST':
            try { 
                const leavetypes = await UserLeaveTypes.create(req.body);
                res.status(201).json({ success: true, data: leavetypes })
            }
            catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        //DEFAULT
        default:
            res.status(400).json({ success: false })
    }
}