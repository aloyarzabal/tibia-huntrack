import { useState, type ChangeEvent } from "react";
import styled, { css } from "styled-components";
import Heading from "../../../components/Heading";
import { parseDamage, parseSession } from "../../summary/utils/parseSession";
import type { InputSession } from "../../types/inputSession";
import { CiNoWaitingSign } from "react-icons/ci";
import { CgRadioCheck, CgCloseO, CgCheckO } from "react-icons/cg";
import type { InputDamage } from "../../types/inputDamage";
import type { InputPayload } from "../../types/payloads";

interface CreateSessionFormProps {
  onSubmitNewSession: (newSession: InputPayload) => void;
}

type ValidationIconState = "default" | "correct" | "incorrect";

// Takes hunting and damage sessions, parses them and lifts them up using
// the function via props: onSubmitNewSession
//  NEEDS REFACTOR ASAP
// *************************************************************
export function CreateSessionForm({
  onSubmitNewSession,
}: CreateSessionFormProps) {
  const [inputSessionValue, setInputSessionValue] = useState<string>("");
  const [inputDamageValue, setInputDamageValue] = useState<string>("");
  const [isInputSessionWrong, setIsInputSessionWrong] = useState(false);
  const [isInputDamageWrong, setIsInputDamageWrong] = useState(false);
  const [parsedSessionInput, setParsedSessionInput] = useState<InputSession>(
    {} as InputSession
  );
  const [parsedDamageInput, setParsedDamageInput] =
    useState<InputDamage | null>(null);

  const [isChecked, setIsChecked] = useState(false);
  const [damageValidationState, setDamageValidationState] =
    useState<ValidationIconState>("default");
  const [sessionValidationState, setSessionValidationState] =
    useState<ValidationIconState>("default");

  const [sessionError, setSessionError] = useState<string | null>(null);
  const [damageError, setDamageError] = useState<string | null>(null);

  // Handler of the Session input
  const handleSessionInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIsInputSessionWrong(false);
    setSessionError("");
    setSessionValidationState("default");
    setInputSessionValue(event.target.value);
  };

  // Handler of the Damage input
  const handleDamageInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setIsInputDamageWrong(false);
    setDamageError("");
    setDamageValidationState("default");
    setInputDamageValue(event.target.value);
  };

  // If the user presses 'Enter', this handler checks if
  // the input is parsed correctly, changing the icon
  // and setting validation to correct if applies.
  const handleSessionKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const parsedInput = parseSession(inputSessionValue);
        setSessionValidationState("correct");
        setParsedSessionInput(parsedInput);
        // onSubmitNewSession(parsedInput);
      } catch (err) {
        setIsInputSessionWrong(true);
        setSessionValidationState("incorrect");
        setSessionError(
          err instanceof Error ? err.message : "Invalid session input!"
        );
      }
    }
  };

  const handleDamageKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      try {
        const parsedInput = parseDamage(inputDamageValue);
        setDamageValidationState("correct");
        setParsedDamageInput(parsedInput);
      } catch (err) {
        setIsInputDamageWrong(true);
        setDamageValidationState("incorrect");
        setDamageError(
          err instanceof Error ? err.message : "Invalid damage input!"
        );
      }
    }
  };

  // Checkbox's handler. Allows to add the Damage Input.
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsInputDamageWrong(false);
    setInputDamageValue("");
    setDamageValidationState("default");
    setDamageError("");
    setIsChecked(event.target.checked);
  };

  //    ********************************************************
  //    If both inputs are correct, the preview button is shown
  //    and this handles it's click.
  //    ____________          ____/
  const handleSubmit = () => {
    const inputPayload: InputPayload = {
      session: parsedSessionInput,
      damage: parsedDamageInput,
    };
    onSubmitNewSession(inputPayload);
  };

  //    ***************************************************
  //    Boolean to show/disable the button after checking
  //    if the introduced inputs are correct.
  //    ______________________        _____/
  const isSubmitButtonDisabled = () => {
    if (isChecked) {
      if (
        sessionValidationState === "correct" &&
        damageValidationState === "correct"
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      if (sessionValidationState === "correct") {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <Styled>
      <Heading as={"h2"} $center>
        New Session
      </Heading>
      <Img src="./Copy_To_Clipboard.jpeg" alt="copy to clipboard" />
      <label htmlFor="textSessionInput">
        Click "Copy to Clipboard" and paste it here:
      </label>
      <TextIconContainer>
        <Textarea
          id="textSessionInput"
          value={inputSessionValue}
          isInputWrong={isInputSessionWrong}
          autoFocus
          onChange={handleSessionInputChange}
          onKeyDown={handleSessionKeyDown}
          placeholder="Paste the hunting session here"
        />
        {(() => {
          switch (sessionValidationState) {
            case "incorrect":
              return <CgCloseO color="red" />;
            case "correct":
              return <CgCheckO color="green" />;
            default:
              return <CgRadioCheck color="var(--color-grey-300)" />;
          }
        })()}
      </TextIconContainer>
      {sessionError && (
        <ErrorMessage>
          <CiNoWaitingSign />
          <b>{sessionError}</b>
        </ErrorMessage>
      )}

      <Checkbox
        type="checkbox"
        id="damage"
        name="damage"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="damage">With Damage Input</label>

      <TextIconContainer>
        <Textarea
          id="textDamageInput"
          value={inputDamageValue}
          disabled={!isChecked}
          isInputWrong={isInputDamageWrong}
          onChange={handleDamageInputChange}
          onKeyDown={handleDamageKeyDown}
          placeholder="Paste the damage analyser here"
        />
        {(() => {
          switch (damageValidationState) {
            case "incorrect":
              return <CgCloseO color="red" />;
            case "correct":
              return <CgCheckO color="green" />;
            default:
              return <CgRadioCheck color="var(--color-grey-300)" />;
          }
        })()}
      </TextIconContainer>
      {damageError && (
        <ErrorMessage>
          <CiNoWaitingSign />
          <b>{damageError}</b>
        </ErrorMessage>
      )}
      <Button onClick={handleSubmit} disabled={isSubmitButtonDisabled()}>
        Submit
      </Button>
    </Styled>
  );
}

const Styled = styled.div`
  max-width: 400px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const TextIconContainer = styled.div`
  display: flex;
  align-items: center;

  & svg {
    font-size: 3rem;
    margin-left: 1rem;
  }
`;

interface textAreaProps {
  isInputWrong: boolean;
}
const Textarea = styled.textarea<textAreaProps>`
  width: 100%;
  display: block;
  margin: 1rem 0;

  ${(props) =>
    props.isInputWrong ? "border:1px solid red;" : "border: 1px solid black;"}

  ${(props) =>
    props.disabled &&
    `background-color: var(--color-grey-300);
     border: 1px solid var(--color-grey-50);
     height: 2rem;
     overflow: hidden;

     &::placeholder {
       opacity: 0;
     }
    `}
`;

const Img = styled.img`
  padding: 30px 0;
`;

const ErrorMessage = styled.div`
  color: red;
  display: flex;
  align-items: center;

  & svg {
    font-size: 2rem;
    margin-right: 0.5rem;
  }
`;

const Button = styled.button`
  background-color: #a7961d;
  font-family: inherit;
  padding: 0.6em 1.3em;
  font-weight: 900;
  font-size: 18px;
  border: 3px solid black;
  border-radius: 0.4em;
  box-shadow: 0.1em 0.1em;

  &:hover {
    transform: translate(-0.05em, -0.05em);
    box-shadow: 0.15em 0.15em;
  }

  &:active {
    transform: translate(0.05em, 0.05em);
    box-shadow: 0.05em 0.05em;
  }

  ${(props) =>
    props.disabled &&
    css`
      color: var(--color-grey-200);
      border-color: var(--color-grey-200);
      background-color: #a7961d6e;
    `}
`;
