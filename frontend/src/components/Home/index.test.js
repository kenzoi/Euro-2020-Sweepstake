import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./index";
import { login } from "../../httpClient/axios";

jest.mock("../../httpClient/axios");


describe("Home React Component", () => {
  test("tests if submit has been clicked once", async () => {
    login.mockResolvedValue({ data: "foo" });

    render(<Home />);

    const button = screen.getByRole("button", { name: "Login" });
    await waitFor(() => userEvent.click(button));

    expect(login).toHaveBeenCalledTimes(1);
  });

  test("tests if submit has been called with the correct value", async () => {
    login.mockResolvedValue({ data: "foo" });
    const fakeUser = "testuser";

    render(<Home />);
    const emailNode = screen.getByRole("textbox", { name: "email" });
    const button = screen.getByRole("button", { name: "Login" });
    userEvent.type(emailNode, fakeUser);
    await waitFor(() => userEvent.click(button));

    expect(login).toHaveBeenCalledWith(fakeUser);
  });

});
