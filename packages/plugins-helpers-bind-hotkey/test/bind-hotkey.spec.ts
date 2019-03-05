import { Editor } from "slate";
import expect from "expect";
import { createEvent } from "../../../support/test-helpers";
import BindHotKey from "../src/index";

describe("bind hotKey", () => {
  it("command triggered on correct hotkey", () => {
    const testCommand = jest.fn();
    const plugins = [
      {
        commands: {
          testCommand: _editor => testCommand()
        }
      },
      BindHotKey({
        commandName: "testCommand",
        hotkeys: "mod+b"
      })
    ];
    const editor = new Editor({ plugins });
    const event = createEvent("keydown", {
      key: "b",
      ctrlKey: true
    });
    editor.run("onKeyDown", event);
    expect(testCommand).toHaveBeenCalled();
  });
  it("command not triggered on hotkey", () => {
    const testCommand = jest.fn();
    const plugins = [
      {
        commands: {
          testCommand: _editor => testCommand()
        }
      },
      BindHotKey({
        commandName: "testCommand",
        hotkeys: "mod+b"
      })
    ];
    const editor = new Editor({ plugins });
    const event = createEvent("keydown", {
      key: "d",
      ctrlKey: true
    });
    editor.run("onKeyDown", event);
    expect(testCommand).not.toHaveBeenCalled();
  });
});
