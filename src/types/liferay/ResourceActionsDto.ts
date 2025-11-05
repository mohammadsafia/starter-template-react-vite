import { ActionDto } from "./ActionDto";

export type ResourceActionsDto = {
  updateBatch: ActionDto;
  get: ActionDto;
  create: ActionDto;
  createBatch: ActionDto;
  deleteBatch: ActionDto;
};
