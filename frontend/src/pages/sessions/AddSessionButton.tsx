import { Button } from "../../components/Button";

type Props = {
  onClick: () => void;
};

export function AddSessionButton({ onClick }: Props) {
  return <Button onClick={onClick} text="Add" />;
}
