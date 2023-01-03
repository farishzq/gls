import dbConnect from "@/lib/NewDBConnect";
import UserProfile from "@/model/Profile"

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
        const users = await UserProfile.findById(id)
        if (!users) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    //Edit a model by its ID
    case 'PUT':
      try {
        const users = await UserProfile.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!users) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: users })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    //Delete a model by its ID
    case 'DELETE':
      try {
        const deletedUser = await UserProfile.deleteOne({ _id: id })
        if (!deletedUser) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}