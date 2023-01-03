import dbConnect from "@/lib/NewDBConnect";
import UserProfile from "@/model/Profile"

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        //GET - baca data profile
        case 'GET':
            try {
                const users = await UserProfile.find({});
                res.status(200).json({ success: true, data: users })
            }
            catch (error) {
                res.status(400).json({ success: false })
            }
            break;

        //GET - tambah profile baru
        case 'POST':
            try { 
                const users = await UserProfile.create(req.body);
                res.status(201).json({ success: true, data: users })
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