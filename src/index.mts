import { noClassInInterfaceProps } from "./no-class-in-interface.mjs";
import { noConstructStackSuffix } from "./no-construct-stack-suffix.mjs";
import { noImportPrivate } from "./no-import-private.mjs";
import { noParentNameConstructIdMatch } from "./no-parent-name-construct-id-match.mjs";
import { noPublicClassFields } from "./no-public-class-fields.mjs";
import { pascalCaseConstructId } from "./pascal-case-construct-id.mjs";

const plugin = {
  rules: {
    "no-class-in-interface": noClassInInterfaceProps,
    "no-construct-stack-suffix": noConstructStackSuffix,
    "no-import-private": noImportPrivate,
    "no-parent-name-construct-id-match": noParentNameConstructIdMatch,
    "no-public-class-fields": noPublicClassFields,
    "pascal-case-construct-id": pascalCaseConstructId,
  },
};

export default plugin;
