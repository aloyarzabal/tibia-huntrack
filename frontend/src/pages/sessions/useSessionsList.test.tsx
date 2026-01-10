import { renderHook, waitFor } from "@testing-library/react";
import { useSessionsList } from "./useSessionsList";
import { fetchSessions } from "../../api/apiSessions";

import { sessions } from "./testFixtures";

jest.mock("../../api/apiSessions");

const mockedFetch = fetchSessions as jest.Mock;

describe("useSessionsList", () => {
  it("starts in loading state", () => {
    mockedFetch.mockResolvedValue([]);

    const { result } = renderHook(useSessionsList);

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.sessions).toEqual([]);
  });

  it("returns sessions when resolves the api call", async () => {
    mockedFetch.mockResolvedValue(sessions);

    const { result } = renderHook(useSessionsList);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeNull();
    expect(result.current.sessions).toEqual(sessions);
  });

  it("returns sessions when rejected from the api call", async () => {
    mockedFetch.mockRejectedValue(new Error("Something went wrong"));
    const { result } = renderHook(useSessionsList);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Something went wrong");
    expect(result.current.sessions).toEqual([]);
  });
});
