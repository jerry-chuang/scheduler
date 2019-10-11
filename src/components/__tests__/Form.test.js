import React from "react";

import { fireEvent, render, cleanup } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form
        // name={interview.student}
        // interviewer={interview.interviewer.id}
        interviewers={interviewers}
        // onSave={onSave}
        // onCancel={onCancel}
      />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form
        name={"Lydia Miller-Jones"}
        // interviewer={interview.interviewer.id}
        interviewers={interviewers}
        // onSave={onSave}
        // onCancel={onCancel}
      />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn((name, interviewer) => {});

    const { getByText } = render(
      <Form
        // name={"Lydia Miller-Jones"}
        // interviewer={interview.interviewer.id}
        interviewers={interviewers}
        onSave={onSave}
        // onCancel={onCancel}
      />
    );
    fireEvent.click(getByText("Save"));
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    const onSave = jest.fn((name, interviewer) => {});

    const { queryByText, getByText } = render(
      <Form
        name={"Lydia Miller-Jones"}
        // interviewer={interview.interviewer.id}
        interviewers={interviewers}
        onSave={onSave}
        // onCancel={onCancel}
      />
    );
    fireEvent.click(getByText("Save"));
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);
    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});
