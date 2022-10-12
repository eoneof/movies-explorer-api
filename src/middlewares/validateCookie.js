import {
  AUTH_REQUIRED_TXT,
} from '../utils/constants.js';

import UnauthorizedError from '../errors/UnauthorizedError.js';

// /**
//  * Validate token and change request header
//  * @returns {{ req: { user: { _id: string, exp: number, iat: number }} }} payload
//  */
// export default function validateToken(req, res, next) {
//   const { authorization } = req.headers;
//   let payload;
//   try {
//     if (!authorization || !authorization.startsWith(TOKEN_PREFIX)) {
//       return next(new UnauthorizedError(AUTH_REQUIRED_TXT));
//     }
//     const token = authorization.replace(TOKEN_PREFIX, '');
//     if (!token) return next(new UnauthorizedError(AUTH_REQUIRED_TXT));

//     payload = jwt.verify(token, JWT_SECRET);
//     req.user = payload;
//   } catch (err) {
//     next(err);
//   }
//   return next();
// }

/**
 * Validate token and change request header
 * @returns {{ req: { user: { _id: string, exp: number, iat: number }} }} payload
 */
export default function validateCookie(err, req, res, next) {
  const { jwt } = req.signedCookies;
  try {
    if (!jwt) return (new UnauthorizedError(AUTH_REQUIRED_TXT));
    return next();
  } catch (err) {
    next(err);
  }
  return next();
}
