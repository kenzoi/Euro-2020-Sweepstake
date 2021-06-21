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

  test("tests if changeHandler is being called", () => {
    const fakeInput = "Kenzo";
    const changeHandler = jest.fn();

    render(<PoolJoin changeHandler={changeHandler} />);
    const joinNode = screen.getByRole("textbox", { name: "Invite code" });
    userEvent.type(joinNode, fakeInput);

    expect(changeHandler).toHaveBeenCalledTimes(5);
  });
});
