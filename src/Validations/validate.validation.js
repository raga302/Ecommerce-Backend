

const validate = async(validateSchema, data, res)=>{
    const validateData =await validateSchema.safeParse(data);
    try {
        if (validateData.success === false) {
            return res.status(400).json({ ...validateData.error.issues })
        }
        return validateData;
    } catch (error) {
        console.log(error);
        
    }
}

export { validate }