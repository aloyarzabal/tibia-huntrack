import styled from "styled-components";
import { LastSessions } from "./SessionsTable";
import { TopSessions } from "./SessionsTop";
import { useEffect, useState } from "react";
import {
  createSession,
  getAllSessions,
  getSessionById,
} from "../../api/apiSessions";
import Modal from "../../components/Modal";
import { NewSessionView } from "./CreateSessionModal/CreateSessionForm";
import { SummaryView } from "../summary/SessionSummary";
import type {
  DatabasePayload,
  InputPayload,
  PostPayload,
} from "../types/payloads";

export function SessionsView() {
  const [sessions, setSessions] = useState<DatabasePayload[]>([]);
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isNewSession, setIsNewSession] = useState(false);
  const [newSession, setNewSession] = useState<InputPayload>(
    {} as InputPayload
  );

  const [selectedSession, setSelectedSession] = useState<DatabasePayload>(
    {} as DatabasePayload
  );

  // Load info from the API and store in State
  useEffect(() => {
    const load = async () => {
      const data = await getAllSessions();

      setSessions(data);
    };

    load();
  }, []);

  //Open and close Modals
  const openNewSessionModal = () => {
    setIsNewSessionModalOpen(true);
    isSummaryModalOpen && closeSummaryView();
  };
  const closeNewSessionModal = () => setIsNewSessionModalOpen(false);
  const openSummaryView = () => setIsSummaryModalOpen(true);
  const closeSummaryView = () => setIsSummaryModalOpen(false);

  // Adds newly created session to the array shown in FE
  const addNewSession = (newSession: DatabasePayload) => {
    setSessions((prev) => [...prev, newSession]);
  };

  // When user clics on one shown session
  //    ____________                    ____/
  const setSessionId = async (id: number) => {
    // const foundSession = sessions.find(({ session }) => session.id === id);
    const foundSession = await getSessionById(id.toString());

    console.log("Sessions View -> found session:", foundSession);

    setIsNewSession(false);
    foundSession && setSelectedSession(foundSession);
    openSummaryView();
  };

  //    ********************************************************
  //    When user clics 'Submit' button in the
  //    New Session View.
  //    __________________    ____/
  const onSubmitNewSession = (payLoad: InputPayload) => {
    setIsNewSession(true);
    setNewSession(payLoad);

    closeNewSessionModal();
    openSummaryView();
  };

  //    ********************************************************
  //    When user clics 'Save' button in the
  //    Summary View.
  //    __________                ____/
  const handleSave = async () => {
    let damageInput;
    if (newSession.damage) {
      damageInput = { ...newSession.damage };
    } else {
      damageInput = null;
    }

    const postPayload: PostPayload = {
      session: { ...newSession.session, characterId: 2, characterLevel: 345 },
      damage: damageInput,
    };

    console.log(postPayload);

    const res = await createSession(postPayload);

    const { data } = await res.json();
    console.log("data: ", data);
    //también devuelve DAMAGE
    addNewSession(data);
    setIsNewSession(false);
    closeSummaryView();
  };

  return (
    <StyledSessionView>
      <TopSessions openNewSessionModal={openNewSessionModal} />
      <LastSessions />

      {isNewSessionModalOpen && (
        <Modal onClose={closeNewSessionModal}>
          <NewSessionView onSubmitNewSession={onSubmitNewSession} />
        </Modal>
      )}

      {isSummaryModalOpen && (
        <Modal onClose={closeSummaryView}>
          <SummaryView
            onSave={handleSave}
            sessionToDisplay={isNewSession ? newSession : selectedSession}
            isNewSession={isNewSession}
          />
        </Modal>
      )}
    </StyledSessionView>
  );
}

const StyledSessionView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10rem;
`;
