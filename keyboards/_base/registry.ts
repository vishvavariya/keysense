import { ModelDef } from './types';
import { magicKeyboard } from '../apple/MagicKeyboard';
import { macBookPro16 } from '../apple/MacBookPro16';
import { mxKeys } from '../logitech/MXKeys';
import { g915Tkl } from '../logitech/G915TKL';
import { mxMechanical } from '../logitech/MXMechanical';
import { k380 } from '../logitech/K380';
import { q1Pro } from '../keychron/Q1Pro';
import { k2 } from '../keychron/K2';

export const modelRegistry: Record<string, ModelDef> = {
  [magicKeyboard.id]: magicKeyboard,
  [macBookPro16.id]: macBookPro16,
  [mxKeys.id]: mxKeys,
  [g915Tkl.id]: g915Tkl,
  [mxMechanical.id]: mxMechanical,
  [k380.id]: k380,
  [q1Pro.id]: q1Pro,
  [k2.id]: k2,
};

export const allModels: ModelDef[] = Object.values(modelRegistry);

export function getModel(id: string): ModelDef | undefined {
  return modelRegistry[id];
}
