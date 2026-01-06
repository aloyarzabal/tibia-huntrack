import type { DatabasePayload } from "../types/payloads";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import "@testing-library/jest-dom";

import { SessionsTable } from "./SessionsTable";
import { emptySession, multipleSessions, sessions } from "./testFixtures";

const HEADERS = ["Date", "Duration", "Balance", "Xp gain", "Level", "Monsters"];

describe("SessionsTable", () => {
  const onRowClick = jest.fn();

  function renderSubject(props: DatabasePayload[] = sessions) {
    render(<SessionsTable onRowClick={onRowClick} sessions={props} />);
  }

  describe("renders", () => {
    it("the table", () => {
      renderSubject();

      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
    });

    it.each(HEADERS)(`the header: %s`, (name) => {
      renderSubject();

      const header = screen.getByRole("columnheader", { name });

      expect(header).toBeInTheDocument();
    });

    it("the rows", () => {
      renderSubject();

      const rows = screen.getAllByRole("row");
      expect(rows).toHaveLength(sessions.length + 1);
    });
  });

  describe("displays the info", () => {
    it("when there is 1 session", () => {
      renderSubject();

      const rows = screen.getAllByRole("row");
      expect(rows[1]).toHaveTextContent("2120092");
      expect(rows[1]).toHaveTextContent("336");
      expect(rows[1]).toHaveTextContent("102308");
    });

    it("when there are no sessions", () => {
      renderSubject(emptySession);

      const firstRow = screen.getAllByRole("row")[1];
      expect(firstRow).toHaveTextContent(
        "No results yet, create your first session!"
      );
    });

    it("when there are multiple sessions", () => {
      renderSubject(multipleSessions);
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(multipleSessions.length + 1);
    });
  });

  it("calls onRowClick with session ID when clicking a row", () => {
    renderSubject();

    const rows = screen.getAllByRole("row");
    fireEvent.click(rows[1]);

    expect(onRowClick).toHaveBeenCalledWith("64");
  });
});
