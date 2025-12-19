import { NextFunction, Request, Response } from "express";
import {
  getCharacterById,
  deleteCharacterByID,
  updateCharactersLevel,
  getAllCharacters,
  addCharacter,
} from "../../db/queries/characters";
import { catchAsync } from "../../server/utils/catchAsync";
import { AppError } from "../../server/utils/appError";

//            /characters/
export const createCharacter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, level, vocation, world, sex } = req.body;

    if (name && level && vocation && world && sex) {
      console.log("Controller: ", name, level, vocation, world, sex);

      const newCharacter = await addCharacter(
        name,
        sex,
        level,
        vocation,
        world
      );

      if (newCharacter) {
        res.status(201).json({
          status: "success",
          data: {
            newCharacter,
          },
        });
      } else {
        new AppError("Characters not created", 500);
      }
    } else {
      next(new AppError("Info is missing", 400));
    }
  }
);

//            /characters/
export const getCharacters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const characters = await getAllCharacters();

    if (!characters) {
      new AppError("Characters not found", 404);
    }

    res.status(200).json({
      status: "success",
      results: characters.length,
      data: {
        characters,
      },
    });
  }
);

//            /characters/:id
export const getCharacter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (id) {
      const character = await getCharacterById(+id);

      if (!character) {
        new AppError("Character not found", 404);
      }

      res.status(200).json({
        status: "success",
        data: {
          character,
        },
      });
    } else {
      next(new AppError("An ID is needed to find the character", 400));
    }
  }
);

//            /characters/:id
export const updateCharacter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const level = req.body.level;

    if (id) {
      const updated = await updateCharactersLevel(+id, level);

      if (!updated) {
        new AppError("Character not updated", 404);
      }

      res.status(200).json({
        status: "success",
        data: {
          updated,
        },
      });
    } else {
      next(new AppError("An ID is needed to update the character", 400));
    }
  }
);

//            /characters/:id
export const deleteCharacter = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (id) {
      const deleted = await deleteCharacterByID(+id);

      if (!deleted) {
        next(new AppError("Character not deleted", 404));
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
