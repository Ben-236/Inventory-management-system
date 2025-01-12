/* eslint-disble */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
import express from 'express';
import bcrypt from 'bcrypt';
import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import TokenUtil from '../helpers/TokenUtil';
import User, { getUserPosVal } from '../database/mongodb/models/User';
import { getUserFromToken } from '../middlewares/authentication';
import { validateEmail } from '../helpers/utils';


/**
* Authentication Controller
*/
class AuthController {
  /**
  * This handles user registration.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
  async signup(req, res) {
    const {
      firstname, lastname, email, password: pass, role,
    } = req.body;

    let roles = `${role || ''}`.toLowerCase().split(' ') || [];
    let position = `${role || ''}`.toLowerCase().replace(/\s/g, '_');

    if (Object.keys(getUserPosVal('all')).includes(role)) {
      roles = ['admin'];
      position = role;
    }

    try {
      const password = bcrypt.hashSync(pass, 10);
      const user = new User({
        firstname,
        lastname,
        email,
        password,
        position,
        roles
      });
      
      user.save();
      return Response.send(res, codes.created, {
        data: { message: 'The user account has been created successfully and user notified.' },
      });
    } catch (error) { return Response.handleError(res, error); }
  }

  /**
  * This handles user login.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
  async login(req, res) {
    const { email, password } = req.body;
  
    try {
      let user = await getUser(email);

      if (!user || !await bcrypt.compareSync(password, user.password || '')) {
        return Response.send(res, codes.unAuthorized, {
          error: `Invalid Email address or password.`,
        });
      }

      user = user.toObject();
      delete user.password;
      delete user.emailtoken;

      const token = TokenUtil.sign(user);
      res.cookie('authorization', token, { maxAge: 900000, httpOnly: true });
      return Response.send(res, codes.success, {
        data: { token, user },
      });
    } catch (error) { return Response.handleError(res, error); }
  }

  /**
  * This handles user request to reset password, and sends password reset email.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
  async requestResetPassword(req, res) {
    const { email } = req.body;
   
    try {
      const user = await getUser(email);

      if (!user) {
        return Response.send(res, codes.badRequest, {
          error: 'User does not exist.',
        });
      }

      const userEmail = user.email || user.merchant_email;

      if (!userEmail) {
        return Response.send(res, codes.badRequest, {
          error: 'No email associated with this account, contact the admin!',
        });
      }

    } catch (error) { return Response.handleError(res, error); }
  }

  /**
  * This handles user changing a users password: with emailtoken or authenticated user token.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
  async resetPassword(req, res) {
    const { token, email, password: pass } = req.body;
    let user = null;

    try {
      if (token) {
        user = await getUser(email, { emailtoken: token });
      } else {
        // Get the logged in user from authorization in param: req
        const loggedIn = getUserFromToken(req);
        if (!loggedIn.status) {
          return Response.send(res, codes.unAuthorized, {
            error: loggedIn.error,
          });
        }
        const uID = loggedIn.user.email;
        isMerchant = !validateEmail(uID);
        user = await getUser(uID, isMerchant);
      }

      if (!user) {
        return Response.send(res, codes.badRequest, {
          error: 'Invalid link, kindly re-request for password reset.',
        });
      }

      const password = bcrypt.hashSync(pass, 10);
      user.password = password;
      user.emailtoken = '';
      await user.save();
      return Response.send(res, codes.success, {
        data: {
          message: 'Password changed successfully.',
          email,
        },
      });
    } catch (error) { return Response.handleError(res, error); }
  }
}

const getUser = async (uId, filter) => {
  if (typeof filter !== 'object' || !filter) filter = {};

  let user = null;
  user = await User.findOne({ email: uId, ...filter });

  return user;
};

export default new AuthController();
