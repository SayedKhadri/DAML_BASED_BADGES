// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useMemo } from 'react'
import { Icon, List } from 'semantic-ui-react'
import { Party } from '@daml/types';
import { MetaBadge } from '@daml.js/badge/lib/Badge';
// import { MetaBadge } from '@daml.js/badge';

type Props = {
  badges: MetaBadge[];
  // partyToAlias: Map<Party, string>;
  onCreateBadge: (userToFollow: Party) => void;
}


/**
 * React component to display a list of `User`s.
 * Every party in the list can be added as a friend.
 */
const Badges: React.FC<Props> = ({badges, onCreateBadge}) => {
  return (
    <List divided relaxed>
      {[...badges].map(badge =>
        <List.Item key={badge.group}>
          <List.Icon name='fax' />
          <List.Item>
            <List.Content>
              <List.Content floated='right'>
                <Icon
                  name='add user'
                  link
                  className='test-select-add-user-icon'
                  onClick={() => onCreateBadge(badge.id)} />
              </List.Content>
              <List.Header className='test-select-user-in-network'>{badge.title}</List.Header>
            </List.Content>
          </List.Item>
          {/* <List.List>
              <List.Item key={badge.id}>
                <List.Content floated='right'>
                  <Icon
                    name='add user'
                    link
                    className='test-select-add-user-following-icon'
                    onClick={() => onCreateBadge(badge.id)} />
                </List.Content>
                <List.Icon name='user outline' />
                <List.Content>
                  <List.Header>{badge.title}</List.Header>
                </List.Content>
              </List.Item>
          </List.List> */}
        </List.Item>
      )}
    </List>
  );
};

export default Badges;
