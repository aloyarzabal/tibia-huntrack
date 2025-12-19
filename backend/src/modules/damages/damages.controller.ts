import { NextFunction, Request, Response } from "express";
import * as damageQueries from "../../db/queries/damageInputs";
import { catchAsync } from "../../server/utils/catchAsync";
import { AppError } from "../../server/utils/appError";

/**
 * INTERNAL function — does NOT receive req/res.
 * Used when creating a session with an attached DamageInput.
 */
export const createDamageInput = async (data: damageQueries.NewDamageInput) => {
  return await damageQueries.createDamageInput(data);
};

export const getDamageInputBySession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = Number(req.params.sessionId);
    if (!sessionId) {
      next(new AppError("A sessionID is needed to get a damageSession", 400));
    }

    const data = await damageQueries.getDamageInputBySession(sessionId);
    if (!data) {
      next(new AppError("Not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  }
);

export const getDamageInputById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (!id) {
      next(new AppError("An ID is needed to get a damageSession", 400));
    }

    const data = await damageQueries.getDamageInputById(id);
    if (!data) {
      next(new AppError("Not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  }
);

export const getAllDamageInputs = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await damageQueries.getAllDamageInputs();
    if (!data) {
      next(new AppError("No damageSessions found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data,
      },
    });
  }
);

export const deleteDamageInputBySession = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const sessionId = Number(req.params.sessionId);
    if (!sessionId) {
      next(
        new AppError("A sessionI is needed to delete the damageSession", 400)
      );
    }

    await damageQueries.deleteDamageInputBySession(sessionId);
    res.status(204).json({
      status: "success",
    });
  }
);

export const deleteDamageInputById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    if (!id) {
      next(new AppError("An ID is needed to delete the damageSession", 400));
    }

    await damageQueries.deleteDamageInputById(id);
    res.status(204).json({
      status: "success",
    });
  }
);

// TO DO although DamageSessions are fixed and impossible to change inside the game,
// therefore shouldn't be not updatable at all

// export const updateDamageInput = async (id: number, fields) => {
//   return await damageQueries.updateDamageInput(id, fields);
// };
