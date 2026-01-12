// @ts-nocheck
import * as __fd_glob_27 from "../content/docs/upgrade/v7.mdx?collection=docs"
import * as __fd_glob_26 from "../content/docs/upgrade/v6.mdx?collection=docs"
import * as __fd_glob_25 from "../content/docs/upgrade/v5.mdx?collection=docs"
import * as __fd_glob_24 from "../content/docs/provider/oxlint.mdx?collection=docs"
import * as __fd_glob_23 from "../content/docs/provider/eslint.mdx?collection=docs"
import * as __fd_glob_22 from "../content/docs/provider/biome.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/migrate/stylelint.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/migrate/prettier.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/migrate/oxlint.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/migrate/eslint.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/migrate/biome.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/usage.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/troubleshooting.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/sponsors.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/setup.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/rules.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/monorepos.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/mcp.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/hooks.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/git-hooks.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/faq.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/configuration.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/cloud.mdx?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/upgrade/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/migrate/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/provider/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "provider/meta.json": __fd_glob_1, "migrate/meta.json": __fd_glob_2, "upgrade/meta.json": __fd_glob_3, }, {"cloud.mdx": __fd_glob_4, "configuration.mdx": __fd_glob_5, "faq.mdx": __fd_glob_6, "git-hooks.mdx": __fd_glob_7, "hooks.mdx": __fd_glob_8, "index.mdx": __fd_glob_9, "mcp.mdx": __fd_glob_10, "monorepos.mdx": __fd_glob_11, "rules.mdx": __fd_glob_12, "setup.mdx": __fd_glob_13, "sponsors.mdx": __fd_glob_14, "troubleshooting.mdx": __fd_glob_15, "usage.mdx": __fd_glob_16, "migrate/biome.mdx": __fd_glob_17, "migrate/eslint.mdx": __fd_glob_18, "migrate/oxlint.mdx": __fd_glob_19, "migrate/prettier.mdx": __fd_glob_20, "migrate/stylelint.mdx": __fd_glob_21, "provider/biome.mdx": __fd_glob_22, "provider/eslint.mdx": __fd_glob_23, "provider/oxlint.mdx": __fd_glob_24, "upgrade/v5.mdx": __fd_glob_25, "upgrade/v6.mdx": __fd_glob_26, "upgrade/v7.mdx": __fd_glob_27, });