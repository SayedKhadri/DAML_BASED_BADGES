// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import { Form, List, Button } from "semantic-ui-react";
import { Party } from "@daml/types";
import { Badge, MetaBadge } from "@daml.js/badge/lib/Badge";

type Props = {
  myBadges: Badge[];
  // partyToAlias: Map<Party, string>;
  // onAddParty: (party: Party) => Promise<boolean>;
};


const toAlias = (userId: string): string =>
  userId.slice(0, 5);

/**
 * React component to edit a list of `Party`s.
 */
const MyBadges: React.FC<Props> = ({
  myBadges,
  // partyToAlias,
  // onAddParty,
}) => {
  return (
      <table style={{"borderWidth":"2px", 'borderColor':"gold", 'borderStyle':'double'}}>
        <tr>
          <th>FROM</th>
          <th>TO</th>
          <th>COMMENTS</th>
          <th>ISSUED ON</th>
        </tr>
     
      {[...myBadges]
        .map(badge => {
          return (
          <><tr key={badge.metaBadgeId}>
              <td style={{ wordWrap: "break-word", backgroundColor: "white" }}>{toAlias(badge.sender)}</td>
              <td style={{ whiteSpace: "nowrap", backgroundColor: "white" }}>{toAlias(badge.receiver[0])}</td>
              <td style={{ wordWrap: "break-word", backgroundColor: "white" }}>{badge.congratsText}</td>
              <td style={{ whiteSpace: "nowrap", backgroundColor: "white" }}>{badge.issuedOn}</td>
            </tr><tr></tr>
              <tr></tr>
              </>
          )
        })}
       </table>
  );
}
export default MyBadges;
