import { Type } from "typescript";

type SuperClassType = "Construct" | "Stack";

/**
 * Check if the type extends Construct or Stack
 * @param type - The type to check
 * @returns True if the type extends Construct or Stack, otherwise false
 */
export const isConstructOrStackType = (type: Type): boolean => {
  return isTargetSuperClassType(type, ["Construct", "Stack"]);
};

/**
 * Check if the type extends Construct
 * @param type - The type to check
 * @returns True if the type extends Construct, otherwise false
 */
export const isConstructType = (type: Type): boolean => {
  return isTargetSuperClassType(type, ["Construct"]);
};

/**
 * Check if the type extends target super class
 * @param type - The type to check
 * @param targetSuperClasses - The target super classes
 * @returns True if the type extends target super class, otherwise false
 */
const isTargetSuperClassType = (
  type: Type,
  targetSuperClasses: SuperClassType[]
): boolean => {
  if (!type.symbol) return false;

  // NOTE: Check if the current type ends in target super class
  if (targetSuperClasses.some((suffix) => type.symbol.name.endsWith(suffix))) {
    return true;
  }

  // NOTE: Check the base type
  const baseTypes = type.getBaseTypes() || [];
  return baseTypes.some((baseType) => isConstructOrStackType(baseType));
};
