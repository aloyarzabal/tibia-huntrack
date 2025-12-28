import { useState } from "react";
import Modal from "../../../components/Modal";
import { SessionSummary } from "../../summary/SessionSummary";
import type { InputPayload, PostPayload } from "../../types/payloads";
import { CreateSessionForm } from "./CreateSessionForm";
import { createSession } from "../../../api/apiSessions";

type Step = "input" | "summary";

type Props = {
  onClose: () => void;
};

export function CreateSessionModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>("input");
  const [payload, setPayload] = useState<InputPayload | null>(null);

  const onSubmitNewSession = (payload: InputPayload) => {
    setPayload(payload);
    setStep("summary");
  };

  const onSave = async () => {
    if (!payload) return;

    // Needed till the level is read by the app automatically
    const post: PostPayload = {
      session: { ...payload.session, characterId: 2, characterLevel: 336 },
      damage: payload.damage,
    };
    await createSession(post);

    onClose();
  };

  return (
    <Modal onClose={onClose}>
      {step === "input" && (
        <CreateSessionForm
          onSubmitNewSession={onSubmitNewSession}
        ></CreateSessionForm>
      )}

      {step === "summary" && payload && (
        <SessionSummary
          sessionToDisplay={payload}
          mode="preview"
          onSave={onSave}
        ></SessionSummary>
      )}
    </Modal>
  );
}
