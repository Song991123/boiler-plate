import cookieParser from 'cookie-parser';
import User from '../models/User.js';

/**
 * @description 인증 처리를 하는 메서드
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export default async function auth(req, res, next){
    try{
        // 1. 클라이언트 쿠키에서 토큰을 가져온다
        let token = req.cookies.x_auth;
        // 토큰이 없으면 인증 실패
        if (!token) {
            return res.status(401).json({ isAuth: false, error: 'No token provided' });
        }
        // 2. 토큰을 복호화한 후 유저를 찾는다
        const user = await User.findByToken(token);
        // 3. 유저가 있으면 인증 OK
        // 3-1. 유저가 없으면 인증 NO
        if (!user) {
            return res.status(401).json({ isAuth: false, error: 'Invalid token' });
        }
        req.token = token;
        req.user = user;
        next();

    }catch(err){
        res.status(500).json({ error: err.message });
    }
}