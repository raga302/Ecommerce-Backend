

const searchByField = async(model, email, res)=>{
    try {
        const data = await model.findOne({email})
        return data
        
        
    } catch (error) {
        return res.status(400).json({ message: "something wrong", error })
    }
}

const modelInsert = async(model, obj)=>{
    try {
        const data =await model.create(obj)
        if (!data) {
            return res.status(400).json({ message:"something wrong try again" })
        }
        return data
    } catch (error) {
        return error
    }
}

export { modelInsert, searchByField }