import jwt from "jsonwebtoken"


const authMiddleware = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({

                success: false,
                message: "no token"
            })
            
        };

        const token = await authHeader.split(" ")[1]

        const payload = await jwt.verify(token,process.env.ACCESSTOKENTKEY)

        req.user = payload
        // console.log(req.user);


        next()

    } catch (error) {
        console.log(error);
        
    }
    
}

export {authMiddleware}


