import { NextFunction, Request, Response } from "express";
import * as sessionQueries from "../../db/queries/sessions";
import { AppError } from "../../server/utils/appError";
import { catchAsync } from "../../server/utils/catchAsync";
import {
  createSessionAndEnrich,
  getSessionById,
  getSessionWithDetails,
} from "./sessions.service";
import { PostDatabaseDamage, PostDatabaseSession } from "./sessions.types";

//            /sessions/
export const createSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { session, damage } = req.body as {
      session: PostDatabaseSession;
      damage?: PostDatabaseDamage;
    };

    if (!session) return next(new AppError("Missing session data", 400));

    const result = await createSessionAndEnrich(session, damage);

    if (!result) return next(new AppError("Session not created", 500));

    res.status(201).json({
      status: "success",
      data: {
        session: result.enrichedSession,
        damage: result.createdDamage,
      },
    });
  }
);

//            /sessions/
export const getAllSessions = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sessions = await sessionQueries.getAllSessionsWithDamage();

    if (!sessions) {
      return next(new AppError("Sessions not found", 400));
    }

    res.status(200).json({
      status: "success",
      results: sessions.length,
      data: sessions,
    });
  }
);

//            /sessions/:id
export const getSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return next(new AppError("Invalid ID.", 400));
    }

    const session = await getSessionById(id);

    if (!session) {
      return next(new AppError("Session not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        session,
      },
    });
  }
);

//            /sessions/:id
export const deleteSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    if (id) {
      const deleted = await sessionQueries.deleteSessionById(+id);

      if (!deleted) {
        next(new AppError("Session not deleted", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          deleted,
        },
      });
    } else {
      next(new AppError("An ID is needed to delete the character", 400));
    }
  }
);

//            /sessions/:id
export const previewSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { session, damage } = req.body as {
      session: PostDatabaseSession;
      damage?: PostDatabaseDamage;
    };

    if (!session) return next(new AppError("Missing session data", 400));

    const preview = getSessionWithDetails(session);

    if (!preview) return next(new AppError("Session not previewed", 500));

    res.status(200).json({
      status: "success",
      data: {
        session: preview,
        damage: damage,
      },
    });
  }
);

// X          /sessions/:id
export const updateSession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // De momento no se hacen updates
  }
);

//Only for Postman or future implementations            /sessions/
export const getAllSessionsNoDamage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sessions = await sessionQueries.getAllSessions();

    if (!sessions) {
      new AppError("Sessions not found", 404);
    }

    res.status(200).json({
      status: "success",
      results: sessions.length,
      data: {
        sessions,
      },
    });
  }
);
