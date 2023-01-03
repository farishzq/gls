//api for leave
import dbConnect from "@/lib/NewDBConnect";
import UserLeave from "@/model/Leave"

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        //GET - baca data profile
        case 'GET':
            try {
                const leaves = await UserLeave.find({});
                res.status(200).json({ success: true, data: leaves })
            }
            catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        //GET - tambah profile baru
        case 'POST':
            try { 
                const leaves = await UserLeave.create(req.body);
                res.status(201).json({ success: true, data: leaves })
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