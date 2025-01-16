export type Pocket = {
  name: string;
  emoji: string;
};

export type CreatePocketPayload = {
  pocket: Pocket;
};

export type EditPocketPayload = {
  id: string;
  pocket: Pocket;
};

export type DeletePocketPayload = {
  id: string;
};

export interface ExtendedPocket extends Pocket {
  _id: string;
  tasks: string[];
}
