/* eslint-disable */
import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import TokenUtil from '../helpers/TokenUtil';
import Logger from '../helpers/Logger';
import { hasRole, checkNumber } from '../helpers/utils';

/**
 * Decodes token to user
 * @param {Request | String} req
 * @param {Boolean} isReq
 */
const getUserFromToken = (req, isReq = true) => {
  let token = isReq ? req.headers.authorization || req.cookies.authorization : req;
  token = `${token || ''}`.split(' ')[1] || token;

  console.log("Parsed token:", token);

  if (!token) {
    return {
      status: false,
      error: 'Authorization is required.',
    };
  }

  const user = TokenUtil.verify(token);
  if (!user) {
    return {
      status: false,
      error: 'Provided authorization is invalid or has expired.',
      token,
    };
  }

  return { status: true, user };
};

/**
 * Checks if user is authenticated
 * @param {Request} req
 * @param {Response} res
 * @param {*} next
 */
const authenticated = (req, res, next) => {
  try {
    const theUser = getUserFromToken(req);

    if (!theUser.status) {
      return Response.send(res, codes.unAuthorized, {
        error: theUser.error,
      });
    }

    const { user } = theUser;
    const tokenExpiresAt = user.exp;
    delete user.iat;
    delete user.exp;

    const tokenExpiresIn = tokenExpiresAt * 1000 - new Date().getTime();
    if (tokenExpiresIn < 20 * 60 * 1000) {
      const token = TokenUtil.sign(user);
      res.token = token;
    }

    req.user = user;
    return next();
  } catch (error) { return Response.handleError(res, error); }
};

/**
 * Check is user is admin
 * @param {String} role - 'role' String OR 'position' Number
 * @param {Number} gte - if 'position', true fot 'Greater Equals', false for 'Less Equals'
 */
const isAdmin = (role = 'admin', gte = true) => (req, res, next) => {
  const { user = {} } = req;
  let userIsAdmin = true;
  if (checkNumber(role)) {
    const position = role;
    role = 'admin';
    const userPosition = user.position || 0;
    userIsAdmin = gte ? userPosition >= position : userPosition <= position;
  }

  const isSuper = hasRole(user, 'super');
  userIsAdmin = isSuper || (hasRole(req.user, role) && userIsAdmin);

  if (!userIsAdmin) {
    return Response.send(res, codes.forbidden, {
      error: 'You are not permitted to access this content.',
    });
  }
  return next();
};


export {
  authenticated, isAdmin, getUserFromToken, 
};
