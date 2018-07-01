import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import client from '../model/db';
import helpers from '../helpers/helper';

dotenv.config();

const controller = {
  getRides: (helpers.checkToken, (req, res) => {
    try {
      jwt.verify(req.headers.jwt, process.env.KEY, null, (err, decoded) => {
        if (err) {
          res.status(403);
          res.json({
            message: 'Forbiden'
          });
        } else {
          const sql = 'SELECT * FROM public."Rides";';
          client.query(sql, (error, result) => {
            if (error || result.rowCount === 0) {
              res.status(401);
              res.json({
                message: 'Unauthorized'
              });
            } else {
              res.status(200);
              res.json(result.rows);
            }
          });
        }
      });
    } catch (e) {
      res.status(403);
      res.json({
        message: 'Forbiden'
      });
    }
  })
};

export default controller;
