import jwt from 'jsonwebtoken';

function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1]; 
        console.log(token);
        if (!token) {
            res.status(401).json({message: 'Пользователь не авторизован'})
        }
        const decodedData = jwt.verify( token, process.env.SECRET_KEY )
        if (!decodedData) {
            return res.status(401).json({message: "Срок действия токена закончился"})
        }
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({message: 'Пользователь не авторизован'})
    }
}

export default checkAuth;