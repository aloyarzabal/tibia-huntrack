import { useState } from "react";
import Modal from "../../../components/Modal";
import { SessionSummary } from "../../summary/SessionSummary";
import type {
  EnrichedDatabasePayload,
  InputPayload,
  PostPayload,
} from "../../types/payloads";
import { CreateSessionForm } from "./CreateSessionForm";
import { createSession, previewSession } from "../../../api/apiSessions";

type Step = "input" | "summary";

type Props = {
  onClose: () => void;
};

export function CreateSessionModal({ onClose }: Props) {
  const [step, setStep] = useState<Step>("input");
  const [postPayload, setPostPayload] = useState<PostPayload | null>(null);
  const [previewPayload, setPreviewPayload] =
    useState<EnrichedDatabasePayload | null>(null);

  const onSubmitNewSession = async (
    payload: InputPayload,
    level: number,
    charId: number,
  ) => {
    const post: PostPayload = {
      session: {
        ...payload.session,
        characterId: charId,
        characterLevel: level,
      },
      damage: payload.damage,
    };

    const preview = await previewSession(post);

    setPostPayload(post);
    setPreviewPayload(preview);
    setStep("summary");
  };

  const onSave = async () => {
    if (!postPayload) return;

    await createSession(postPayload);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      {step === "input" && (
        <CreateSessionForm onSubmitNewSession={onSubmitNewSession} />
      )}

      {step === "summary" && previewPayload && (
        <SessionSummary
          sessionToDisplay={previewPayload}
          mode="preview"
          onSave={onSave}
        />
      )}
    </Modal>
  );
}
