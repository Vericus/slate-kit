import React from "react";
import { shallow } from "enzyme";

import Image, { resetForm, bytesToMb } from "../src/components/Image";

const BLOB_URL =
  "blob:http://localhost:6006/07b3b520-7aab-4ff8-9a84-b090f3cc4351";
const STANDARD_URL =
  "http://localhost:6006/07b3b520-7aab-4ff8-9a84-b090f3cc4351";

// Tests for exported functions
describe("translates bytes to megabytes", () => {
  it("translates 0 to string MB", () => {
    const zero = 0;
    expect(bytesToMb(zero)).toEqual("0.0 MB");
  });
  it("translates a 5 or less digit number of MB to string MB", () => {
    const fraction = 104857;
    expect(bytesToMb(fraction)).toEqual("0.1 MB");
  });
  it("translates to 6 digit number to string MB", () => {
    const oneDigit = 1048576;
    expect(bytesToMb(oneDigit)).toEqual("1.0 MB");
  });
  it("translates to 6+ digit number to string MB", () => {
    const twoDigit = 10485760;
    expect(bytesToMb(twoDigit)).toEqual("10.0 MB");
  });
});
describe("reset input form value", () => {
  let input;
  beforeEach(() => {
    input = document.createElement("input");
  });
  it("resets string", () => {
    input.value = "first";
    expect(input.value).toEqual("first");
    resetForm(input);
    expect(input.value).toEqual("");
  });
  it("resets file", () => {
    input.value = new File([""], "new-file");
    expect(input.value).toEqual("[object File]");
    resetForm(input);
    expect(input.value).toEqual("");
  });
});

// Default props for Image
const attributes = {
  "data-key": "1"
};
const editor = {
  change: () => {},
  props: { isReadOnly: false }
};
const node = {
  data: new Map(),
  key: attributes["data-key"]
};
const options = {};

// Tests for component methods
describe("<Image /> component's onImgLoad method", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={options}
        node={node}
      />
    );
  });
  it("should not change loading when src is a blob", () => {
    const initialLoadingState = true;
    wrapper.setState({
      loading: initialLoadingState,
      src: BLOB_URL
    });
    wrapper.instance().onImgLoad();
    expect(wrapper.state().loading).toEqual(initialLoadingState);
  });
  it("should set loading to false when src is NOT a blob", () => {
    wrapper.setState({
      loading: true,
      src: STANDARD_URL
    });
    wrapper.instance().onImgLoad();
    expect(wrapper.state().loading).toEqual(false);
  });
});
describe("updateError", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={options}
        node={node}
      />
    );
  });
  it("updates error with text", () => {
    const errorMessage = "There was an error";
    wrapper.instance().updateError(errorMessage);
    expect(wrapper.state().error).toEqual(errorMessage);
  });
  it("updates error with no text", () => {
    const errorMessage = "";
    wrapper.instance().updateError(errorMessage);
    expect(wrapper.state().error).toEqual(errorMessage);
  });
});
describe("updateSrc", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={options}
        node={node}
      />
    );
  });
  it("updates src state", () => {
    wrapper.instance().updateSrc(BLOB_URL);
    expect(wrapper.state().src).toEqual(BLOB_URL);
  });
  it("sets loading state to false", () => {
    wrapper.instance().updateSrc(BLOB_URL);
    expect(wrapper.state().loading).toEqual(false);
  });
  it("sets error state to empty string", () => {
    wrapper.instance().updateSrc(BLOB_URL);
    expect(wrapper.state().error).toEqual("");
  });
  it("updates node data to src", () => {
    // Needs to define change.setNodeByKey from slate
  });
});
describe("validFileType", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={options}
        node={node}
      />
    );
  });
  it("accepts png", () => {
    const file = new File([""], "file.png", { type: "image/png" });
    expect(wrapper.instance().validFileType(file.type)).toEqual(true);
  });
  it("accepts jpeg", () => {
    const file = new File([""], "file.jpeg", { type: "image/jpeg" });
    expect(wrapper.instance().validFileType(file.type)).toEqual(true);
  });
  it("accepts jpg", () => {
    const file = new File([""], "file.jpg", { type: "image/jpg" });
    expect(wrapper.instance().validFileType(file.type)).toEqual(true);
  });
  it("accepts gif", () => {
    const file = new File([""], "file.gif", { type: "image/gif" });
    expect(wrapper.instance().validFileType(file.type)).toEqual(true);
  });
  it("rejects txt", () => {
    const file = new File([""], "file.txt", { type: "text/plain" });
    expect(wrapper.instance().validFileType(file.type)).toEqual(false);
  });
  it("rejects word document", () => {
    const file = new File([""], "file.docx", {
      type:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
    expect(wrapper.instance().validFileType(file.type)).toEqual(false);
  });
});
describe("validFileSize", () => {
  const wrapperDefaultMFS = shallow(
    <Image
      attributes={attributes}
      readOnly={false}
      isSelected={false}
      editor={editor}
      options={{}}
      node={node}
    />
  );
  const wrapperCustomMFS = shallow(
    <Image
      attributes={attributes}
      readOnly={false}
      isSelected={false}
      editor={editor}
      options={{ maxFileSize: 5000000 }}
      node={node}
    />
  );
  it("rejects over default", () => {
    expect(wrapperDefaultMFS.instance().validFileSize(20000000)).toEqual(false);
  });
  it("accepts default", () => {
    expect(wrapperDefaultMFS.instance().validFileSize(10485760)).toEqual(true);
  });
  it("accepts under default", () => {
    expect(wrapperDefaultMFS.instance().validFileSize(10000000)).toEqual(true);
  });
  it("rejects over custom size", () => {
    expect(wrapperCustomMFS.instance().validFileSize(5000001)).toEqual(false);
  });
  it("accepts custom size", () => {
    expect(wrapperCustomMFS.instance().validFileSize(5000000)).toEqual(true);
  });
  it("accepts under custom size", () => {
    expect(wrapperCustomMFS.instance().validFileSize(4999999)).toEqual(true);
  });
});

// Snapshot tests
describe("<Image /> component", () => {
  it("should render <Image /> component correctly", () => {
    const wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={options}
        node={node}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

// Expected behaviours
describe("Loading behaviour", () => {
  const nodeWithBlobSrc = {
    data: new Map([["src", BLOB_URL]]),
    key: "1"
  };
  const nodeWithStaticSrc = {
    data: new Map([["src", STANDARD_URL]]),
    key: "1"
  };
  const optionsWithUpload = {
    uploadImage: () => {}
  };
  const optionsWithoutUpload = {};
  const LOADING = true;
  const LOADED = false;
  const STUB_FILE = new File([""], "temp-file");

  it("is freshly mounted blob, upload enabled. Should immediately be loading", () => {
    const wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={optionsWithUpload}
        node={nodeWithBlobSrc}
      />
    );
    expect(wrapper.state().loading).toEqual(LOADING);
  });
  it("is freshly mounted blob, upload disabled. Should immediately be not loading (loaded)", () => {
    const wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={optionsWithoutUpload}
        node={nodeWithBlobSrc}
      />
    );
    // Does not go through fetch, force attempt upload as it would normally.
    wrapper.instance().attemptUpload(STUB_FILE);
    expect(wrapper.state().loading).toEqual(LOADED);
  });
  it("is freshly mounted static url. Should immediately be loading", () => {
    const wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={options}
        node={nodeWithStaticSrc}
      />
    );
    expect(wrapper.state().loading).toEqual(LOADING);
  });
  it("is existing mount, added blob, upload enabled. Should immediately be loading", () => {
    const wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={optionsWithUpload}
        node={node}
      />
    );
    wrapper.instance().attemptUpload(STUB_FILE);
    expect(wrapper.state().loading).toEqual(LOADING);
  });
  it("is existing mount, added blob, upload disabled. Should immediately be not loading (loaded)", () => {
    const wrapper = shallow(
      <Image
        attributes={attributes}
        readOnly={false}
        isSelected={false}
        editor={editor}
        options={optionsWithoutUpload}
        node={node}
      />
    );
    wrapper.instance().attemptUpload(STUB_FILE);
    expect(wrapper.state().loading).toEqual(LOADED);
  });
});

// Later tests - low priority
describe("attemptBlobUpload", () => {});
describe("attemptUpload", () => {});
describe("handleInsertImage", () => {
  it("updates src if valid file selected", () => {});
});
describe("deleteImage", () => {
  it("removes the component", () => {});
});
describe("selectFile", () => {
  it("clicks the correct input", () => {});
});
describe("createInput", () => {
  it("returns an input", () => {});
});
