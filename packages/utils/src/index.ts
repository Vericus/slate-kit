import { Plugin } from "slate";
import createCommands from "./commands";
import createQueries from "./queries";

export default function create(): Plugin {
  const queries = createQueries();
  const commands = createCommands();
  return {
    queries,
    commands
  };
}
