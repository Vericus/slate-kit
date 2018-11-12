import createCommands from "./commands";
import createQueries from "./queries";

export default function create() {
  const queries = createQueries();
  const commands = createCommands();
  return {
    queries,
    commands
  };
}
