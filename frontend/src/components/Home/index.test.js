// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import Home from "./index";
// import { login } from "../../httpClient/axios";

// jest.mock("../../httpClient/axios", () => {
//   return {
//     login: jest.fn(() => {
//       data: "fakeData";
//     }),
//   };
// });

// test("calls onSubmit with the username when submitted", () => {
//   const fakeUser = "testuser@blabla.com";
//   const loginHandler = jest.fn();

//   render(<Home />);

//   const emailNode = screen.getByRole("textbox", { name: "email" });
//   const buttonNode = screen.getByRole("button", { name: "Login" });

//   userEvent.type(emailNode, fakeUser);

//   userEvent.click(buttonNode);
//   // emailNode.value = fakeUser;

//   //const button1 = getByRole("button", { name: "Login" });

//   // fireEvent.click(button1);

//   // await loginHandler;

//   expect(login).toHaveBeenCalledTimes(1);

//   console.log("test");
// });

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./index";
import { login } from "../../httpClient/axios";

jest.mock("../../httpClient/axios");

test("calls onSubmit with the username and password when submitted", async () => {
  login.mockResolvedValue({ data: "foo" });

  const fakeUser = "testuser";
  render(<Home />);

  const emailNode = screen.getByRole("textbox", { name: "email" });
  const button = screen.getByRole("button", { name: "Login" });
  userEvent.type(emailNode, fakeUser);

  await waitFor(() => userEvent.click(button));

  expect(login).toHaveBeenCalledTimes(1);
});
