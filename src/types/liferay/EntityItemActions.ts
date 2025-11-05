import { ActionDto } from "./ActionDto";

export type EntityItemActions = {
  permissions: ActionDto;
  get: ActionDto;
  replace: ActionDto;
  update: ActionDto;
  delete: ActionDto;
  create: ActionDto;
};
