import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";

function isAuth(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({
            sucess: false,
            message: "Please Login First"
        });
    }
    jsonwebtoken.verify(token, process.env.SECRET_PRIVATE_KEY, (err, decoded) => {
        if (err) {
            res.send({
                message: "JWT verification failed",
                ...err
            })
        }
        else {
            User.findById(decoded.id)
                .then(user => {
                    if (!user) return res.status(404).send({ message: 'Your session expired please login again' })
                    req.user = user;
                    next();
                })
                .catch(err => {
                    res.send({
                        success: false,
                        ...err
                    })
                })
        }
    })
}

export default isAuth;