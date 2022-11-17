// Copyright (c) 2022 Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import { Badge } from '@daml.js/badge';
// import { MetaBadge } from '@daml.js/badge/lib/Badge';
import { Party } from '@daml/types';
import React, { useMemo } from 'react';
import { Container, Grid, Header, Icon, Segment, Divider } from 'semantic-ui-react';
// import { Party } from '@daml/types';
// import { MetaBadge} from '@daml.js/badge';
import { publicContext, userContext } from './App';
import Badges from './Badges';
// import UserList from './UserList';
import MyBadges from './MyBadges';

// USERS_BEGIN
const MainView: React.FC = () => {
  const username = userContext.useParty();
//   const myUserResult = userContext.useStreamFetchByKeys(User.User, () => [username], [username]);
//   const aliases = publicContext.useStreamQueries(User.Alias, () => [], []);
//   const myUser = myUserResult.contracts[0]?.payload;
  const badgesContracts = userContext.useStreamQueries(Badge.MetaBadge).contracts;
  const myBadgeContracts = userContext.useStreamQueries(Badge.Badge).contracts;
// // USERS_END
  // alert (badgesContracts[0]?.payload.title);
  // Sorted of all metabadges

  const myUserName = userContext.useUser().userId;

  const allBadges = useMemo(() =>
    badgesContracts
    .map(badge => badge.payload),
    [badgesContracts]);

  //need to change  
  const myBadges = useMemo (() => 
    myBadgeContracts
    .map(badge => badge.payload)
    .filter(b => b.receiver.includes(username)) ,
    [myBadgeContracts]
  );

  // alert (JSON.stringify(myBadges))
//   // Map to translate party identifiers to aliases.
//   const partyToAlias = useMemo(() =>
//     new Map<Party, string>(aliases.contracts.map(({payload}) => [payload.username, payload.alias])),
//     [aliases]
//   );
  // var map = Map<String, [Meta]; 

  // const grouped = allBadges.reduce((map, badge) => {
  //   (map[badge.group] = map[badge.group] || []).push(badge);
  //   return map;
  // }, map);

  // alert (JSON.stringify(grouped))


  // GIVE_BADGE Begins
  const ledger = userContext.useLedger();
  const giveBadge = async (userToFollow: Party): Promise<boolean> => {
    try {
      // await ledger.exerciseByKey(User.User.Follow, username, {userToFollow});
      return true;
    } catch (error) {
      alert(`Unknown error:\n${JSON.stringify(error)}`);
      return false;
    }
  }
  // GIVE BADGE END

  return (
    <Container fluid>
      <Grid centered columns={2}>
        <Grid.Row stretched>
          <Grid.Column>
            <Header as='h1' size='huge' color='blue' textAlign='center' style={{padding: '1ex 0em 0ex 0em'}}>
                {myUserName ? `Welcome, ${myUserName}!` : 'Loading...'}
            </Header>

            <Segment>
              <Header as='h2'>
                <Icon name='user' />
                <Header.Content>
                  {myUserName ?? 'Loading...'}
                  <Header.Subheader>My Badges</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <MyBadges
                myBadges={myBadges}
                // partyToAlias={partyToAlias}
                // onAddParty={follow}
              />
            </Segment>
            <Segment>
              <Header as='h2'>
                <Icon name='globe' />
                <Header.Content>
                  BADGES : Digital Platform
                  <Header.Subheader>List of available badges</Header.Subheader>
                </Header.Content>
              </Header>
              <Divider />
              <Badges
                badges={allBadges}
                onCreateBadge={giveBadge}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default MainView;
