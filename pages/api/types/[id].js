//api for leave
import dbConnect from "@/lib/NewDBConnect";
import UserLeaveTypes from "@/model/Ltypes"

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
        const leavetypes = await UserLeaveTypes.findById(id)
        if (!leavetypes) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: leavetypes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    //Edit a model by its ID
    case 'PUT':
      try {
        const leavetypes = await UserLeaveTypes.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!leavetypes) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: leavetypes })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}