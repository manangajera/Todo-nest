/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    user?: { userId: string; username: string };
  }

@Injectable()
export class Middleware implements NestMiddleware {
  use(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const token = req.header('Authorization')?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback_secret_key" as string) as { id: string; username: string };

      // Attach user data to request object for further processing
      req.user = { userId: decoded.id, username: decoded.username };
      next();
    } catch (error) {
      return res.status(401).json(error);
    }
  }
}
