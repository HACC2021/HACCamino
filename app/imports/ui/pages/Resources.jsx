import React from 'react';
import { Grid, Header, Label, Table } from 'semantic-ui-react';

const Resources = () => (
  <Grid container textAlign='center'>
    <Grid.Row>
      <Grid.Column>
        <Header
          as="h2"
          textAlign="center"
          content={'Contact Details'}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><Label as='a' color='blue' ribbon>Type of Facility</Label></Table.HeaderCell>
            <Table.HeaderCell>Species</Table.HeaderCell>
            <Table.HeaderCell>Organization</Table.HeaderCell>
            <Table.HeaderCell> Primary Contact</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>State</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell>Kaua‘i Division of Forestry and Wildlife (DOFAW</Table.Cell>
            <Table.Cell>(808) 274- 3433, (808) 632- 0610, (808) 645- 1576</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Licensed rehabber, see website for drop off locations</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell>Save our Shearwaters, Kauaʻi Humane Society</Table.Cell>
            <Table.Cell>
              (808) 635- 5117</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
      <Grid.Row>
        <Header
            as="h2"
            textAlign="center"
            content={'OAHU'}
        />
      </Grid.Row>
    <Grid.Row>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><Label as='a' color='blue' ribbon>Type of Facility</Label></Table.HeaderCell>
            <Table.HeaderCell>Drop Off Information</Table.HeaderCell>
            <Table.HeaderCell>Species</Table.HeaderCell>
            <Table.HeaderCell>Organization</Table.HeaderCell>
            <Table.HeaderCell> Primary Contact</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Licensed rehabber, Rescue & Response</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell>Hawai‘i Wildlife Center </Table.Cell>
            <Table.Cell>(808) 884- 5000</Table.Cell>

          </Table.Row>
          <Table.Row>
            <Table.Cell>Rescue & Response</Table.Cell>
            <Table.Cell>7 days/week 7:00am – 7:00pm</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>Hawaii Marine Animal Response (HMAR)</Table.Cell>
            <Table.Cell>
              808-220-7802</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>24 hours, 7 days/week</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>Feather and Fur Animal Hospital: 25 Kaneohe Bay Dr #132, Kailua, HI 96734</Table.Cell>
            <Table.Cell>
              N/A</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>Monday – Friday 8am – 5pm, not available Saturday and Sunday</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>James Campbell National Wildlife Refuge: 56-795 Kamehameha Highway Kahuku, HI 96731</Table.Cell>
            <Table.Cell>
              (808) 637- 6330 ext 4 , (808) 637- 6330 ext 1</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>7am-7pm, 7 days/week</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>Hawaiian Humane Society, 2700 Waialae Ave, Honolulu, HI 9682</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>State</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell>O‘ahu Division of Forestry and Wildlife (DOFAW)</Table.Cell>
            <Table.Cell>(808) 973- 9786, (808) 295- 5896 ,(808) 226- 6050</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Licensed rehabber and drop off location</Table.Cell>
            <Table.Cell>24 hours, 7 days/week</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>Sea Life Park
              <b>41-202 Kalanianaole Hwy, Waimanalo, HI 96795</b>
              Not currently permitted
            </Table.Cell>
            <Table.Cell>(808) 259- 2537</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>November and December only, 7:45am -4:00pm M-F</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>Waianae Small Boat Harbor: 85-491 Farrington Hwy, Waianae, HI 96792</Table.Cell>
            <Table.Cell>(808) 697-7095</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
    <Grid.Row>
      <Header
          as="h2"
          textAlign="center"
          content={'MAUI NUI'}
      />
    </Grid.Row>
    <Grid.Row>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><Label as='a' color='blue' ribbon>Island</Label></Table.HeaderCell>
            <Table.HeaderCell>Species</Table.HeaderCell>
            <Table.HeaderCell>Organization</Table.HeaderCell>
            <Table.HeaderCell>Primary Contact</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Maui</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell>Maui Division of Forestry and Wildlife (DOFAW)</Table.Cell>
            <Table.Cell>(808) 984- 8100   </Table.Cell>

          </Table.Row>
          <Table.Row>
            <Table.Cell>Maui</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>Maui Nui Seabird Recovery Project</Table.Cell>
            <Table.Cell>
              (808) 573- BIRD (2473)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Moloka‘i</Table.Cell>
            <Table.Cell>
              All native species</Table.Cell>
            <Table.Cell>
              Moloka‘i Division of Forestry and Wildlife (DOFAW)</Table.Cell>
            <Table.Cell>(808) 553- 1745, (808) 870- 7598</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Moloka‘i</Table.Cell>
            <Table.Cell>Waterfowl and shorebirds</Table.Cell>
            <Table.Cell>Arleone Dibben-Young</Table.Cell>
            <Table.Cell>
              email</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Lana‘i</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell>Lana‘i Division of Forestry and Wildlife (DOFAW)</Table.Cell>
            <Table.Cell>(808) 565- 7916, (808) 357- 5090</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Lana‘i licensed rehabber</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell>Hawai‘i Wildlife Center</Table.Cell>
            <Table.Cell>(808) 884- 5000, (808) 563- 0013</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
  </Grid>
);

export default Resources;
