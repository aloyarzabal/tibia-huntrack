import type { DatabasePayload } from "../types/payloads";

interface Props {
  session: DatabasePayload;
}

export function SessionRow({ session }: Props) {
  return (
    <tr key={session.session.id}>
      <td></td>
    </tr>
  );
}
