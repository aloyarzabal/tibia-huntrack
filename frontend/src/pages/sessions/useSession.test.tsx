import { renderHook, waitFor } from "@testing-library/react";
import { getSessionById } from "../../api/apiSessions";
import { useSession } from "./useSession";
import { sessions } from "./testFixtures";

jest.mock("../../api/apiSessions");

const mockedFetch = getSessionById as jest.Mock;

describe("useSession", () => {
  it("sets loading true when starting", () => {
    mockedFetch.mockResolvedValue(sessions[0]);

    const { result } = renderHook(() => useSession("64"));

    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.session).toBeNull();
  });

  it("returns a session when resolves", async () => {
    mockedFetch.mockResolvedValue(sessions[0]);

    const { result } = renderHook(useSession);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBeNull();
    expect(result.current.session).toBe(sessions[0]);
  });

  it("returns error when cannot fetch", async () => {
    mockedFetch.mockRejectedValue(new Error("network issue"));

    const { result } = renderHook(useSession);

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toEqual("network issue");
    expect(result.current.session).toBeNull();
  });
});
