import styled from "styled-components";
import { monsterNameToImageUrl } from "../summary/utils/monsterToUrl";
import type { DatabasePayload } from "../types/payloads";

interface Props {
  sessions: DatabasePayload[];
  onRowClick: (id: string) => void;
}

export function SessionsTable({ sessions, onRowClick }: Props) {
  return (
    <Table>
      <Thead>
        <tr>
          <th>Date</th>
          <th>Duration</th>
          <th>Balance</th>
          <th>Xp gain</th>
          <th>Level</th>
          <th>Monsters</th>
        </tr>
      </Thead>
      <Tbody>
        {sessions.length ? (
          sessions.map((session) => (
            <TableRow
              key={session.session.id}
              onClick={() => onRowClick(session.session.id.toString())}
            >
              <td>
                {new Date(session.session.sessionDate).toLocaleDateString()}
              </td>
              <td>{session.session.sessionLength}</td>
              <td>{session.session.balance}</td>
              <td>{session.session.xpGain}</td>
              <td>{session.session.characterLevel}</td>
              <td>
                {session.session.killedMonsters
                  .filter((m) => m.count > 100)
                  .map((m) => (
                    <MonsterSpec
                      key={m.name}
                      src={monsterNameToImageUrl(m.name)}
                      alt={m.name}
                    />
                  ))}
              </td>
            </TableRow>
          ))
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }}>
              No results yet, create your first session!
            </td>
          </tr>
        )}
      </Tbody>
    </Table>
  );
}

const MonsterSpec = styled.img`
  height: 3.5rem;
`;

const Table = styled.table`
  width: 100%;
  border: 1px solid lightgray;
`;

const Thead = styled.thead`
  & th {
    padding: 1rem;
    background-color: var(--color-grey-500);
    text-transform: uppercase;
    font-family: monospace;
    color: white;
    font-weight: 100;
  }
`;
const Tbody = styled.tbody``;

const TableRow = styled.tr`
  cursor: pointer;

  &:nth-child(even) {
    background-color: var(--color-grey-200);
  }
  &:nth-child(odd) {
    background-color: var(--color-grey-0);
  }
  &:hover {
    box-shadow: 1px 1px 10px 5px lightsteelblue;
    transform: scale(1.03);
  }

  &:active {
    transform: translateY(5px);
  }

  & td {
    text-align: center;
    vertical-align: middle;
  }
`;
