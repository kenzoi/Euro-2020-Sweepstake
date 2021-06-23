import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PoolJoin from "./index";

describe("PoolJoin React Component", () => {
  test("tests if 'Join Existing Pool' has been clicked once", async () => {
    const submitHandler = jest.fn((e) => e.preventDefault());

    render(<PoolJoin submitHandler={submitHandler} />);
    const button = screen.getByRole("button", { name: "Join Existing Pool" });
    await waitFor(() => userEvent.click(button));

    expect(submitHandler).toHaveBeenCalledTimes(1);
  });

  test("tests if is bein called with the correct value", async () => {
    const fakeInput = "Kenzo";
    let fakeValue = "";
    const submitHandler = jest.fn((e) => e.preventDefault());
    const changeHandler = jest.fn((e) => (fakeValue += e.target.value)); // userEvent.type is passing char by char, not the entire word as e.target.value

    render(
      <PoolJoin
        submitHandler={submitHandler}
        changeHandler={changeHandler}
        value={fakeValue}
      />
    );
    const button = screen.getByRole("button", { name: "Join Existing Pool" });
    const joinNode = screen.getByRole("textbox", { name: "Invite code" });
    userEvent.type(joinNode, fakeInput);
    await waitFor(() => userEvent.click(button));

    expect(fakeInput === fakeValue).toBe(true);
  });

  test("tests if changeHandler is being called", () => {
    const fakeInput = "Kenzo";
    const changeHandler = jest.fn();

    render(<PoolJoin changeHandler={changeHandler} />);
    const joinNode = screen.getByRole("textbox", { name: "Invite code" });
    userEvent.type(joinNode, fakeInput);

    expect(changeHandler).toHaveBeenCalledTimes(5);
  });
});
