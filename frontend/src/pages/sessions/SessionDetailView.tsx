import { useNavigate, useParams } from "react-router-dom";
import { SessionSummary } from "../summary/SessionSummary";
import { useSession } from "./useSession";
import { Loader } from "../../components/Loader";
import { Button } from "../../components/Button";

export function SessionDetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) return <p>Invalid session id</p>;

  const { session, loading, error } = useSession(id);

  if (loading) return <Loader />;

  if (!session) return <p>Session not found</p>;

  return (
    <>
      <Button onClick={() => navigate("/sessions")} text="← Back to Sessions" />
      {error ? (
        <p>{error}</p>
      ) : (
        <SessionSummary mode="readonly" sessionToDisplay={session} />
      )}
    </>
  );
}
