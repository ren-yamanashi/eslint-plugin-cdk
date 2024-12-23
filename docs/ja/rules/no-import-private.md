---
title: eslint-cdk-plugin - no-import-private
titleTemplate: ":title"
next: false
---

# no-import-private

<div style="margin-top: 16px; background-color: #595959; padding: 16px; border-radius: 4px;">
  ℹ️ このルールは
  <a href="/ja/rules/#recommended-rules">recommended</a>
  ルールには含まれていません。
</div>

このルールは、異なる階層レベルの `private` ディレクトリからのモジュールのインポートを禁止します。

設定する場合は、次のように記述する必要があります。

```js
// eslint.config.mjs
import eslintCdkPlugin from "eslint-cdk-plugin";
export default [
  {
    plugins: {
      cdk: eslintCdkPlugin,
    },
    rules: {
      ...cdkPlugin.configs.recommended.rules,
      "cdk/no-import-private": "error",
    },
  },
];
```

`private`ディレクトリは、親ディレクトリ内でのみ使用される内部実装を格納することを目的としています。  
異なる階層からのインポートを禁止することで、適切なモジュール化とカプセル化を促進します。

#### ✅ 正しい例

```ts
// src/constructs/my-construct.ts
import { MyConstruct } from "./private/my-construct";
```

#### ❌ 不正な例

```ts
// src/constructs/my-construct.ts
import { MyConstruct } from "../private/my-construct";
import { MyConstruct } from "../my-app/private/my-construct";
```
