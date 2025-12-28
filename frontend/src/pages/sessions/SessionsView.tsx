import { Loader } from "../../components/Loader";
import { AddSessionButton } from "./AddSessionButton";
import { SessionsTable } from "./SessionsTable";
import { TopSessions } from "./SessionsTop";
import { useSessionsList } from "./useSessionsList";
import Heading from "../../components/Heading";
import { useState } from "react";
import { CreateSessionModal } from "./CreateSessionModal/CreateSessionModal";
import { useNavigate } from "react-router-dom";

export function SessionsView() {
  const { sessions, loading, error } = useSessionsList();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (error) return <p>ERROR</p>;

  const handleOpenSession = (id: string) => {
    navigate(`/sessions/${id}`);
  };

  return (
    <>
      <AddSessionButton onClick={() => setOpen(true)} />
      <TopSessions />

      <Heading as={"h2"} $center>
        Last sessions
      </Heading>
      <SessionsTable sessions={sessions} onRowClick={handleOpenSession} />

      {open && <CreateSessionModal onClose={() => setOpen(false)} />}
    </>
  );
}
