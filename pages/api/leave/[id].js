//api for leave
import dbConnect from "@/lib/NewDBConnect";
import UserLeave from "@/model/Leave"

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {

    //Get a model by its ID
    case 'GET':
      try {
        const leaves = await UserLeave.findById(id)
        if (!leaves) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: leaves })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    //Edit a model by its ID
    case 'PUT':
      try {
        const leaves = await UserLeave.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!leaves) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: leaves })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}