import React from 'react';
import { Grid, Header, Label, Table } from 'semantic-ui-react';

const Resources = () => (
  <Grid container textAlign='center'>
    <Grid.Row>
      <Grid.Column>
        <Header
          as="h1"
          textAlign="center"
          content={'Contact Details'}
        />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Header
          as="h3"
          textAlign="left"
          content={'KAUAI'}
      />
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
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://dlnr.hawaii.gov/dofaw/'}>Kaua‘i Division of Forestry and Wildlife (DOFAW</a></Table.Cell>
            <Table.Cell><p>(808) 274- 3433</p><p>(808) 632- 0610</p><p>(808) 645- 1576</p></Table.Cell>
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
      <Grid.Row textAlign={'left'}>
        <Header
            as="h3"
            floated="left"
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
            <Table.Cell><a href={'https://www.hawaiiwildlifecenter.org/'}>Hawai‘i Wildlife Center</a></Table.Cell>
            <Table.Cell>(808) 884- 5000</Table.Cell>

          </Table.Row>
          <Table.Row>
            <Table.Cell>Rescue & Response</Table.Cell>
            <Table.Cell>7 days/week 7:00am – 7:00pm</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell><a href={'https://h-mar.org/'}>Hawaii Marine Animal Response (HMAR)</a></Table.Cell>
            <Table.Cell>
              808-220-7802</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>24 hours, 7 days/week</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://www.featherandfur.com/'}>Feather and Fur Animal Hospital</a>:
              <p>25 Kaneohe Bay Dr #132, Kailua, HI 96734</p></Table.Cell>
            <Table.Cell>
              N/A</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>Monday – Friday 8am – 5pm, not available Saturday and Sunday</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://www.fws.gov/refuge/james_campbell/'}>James Campbell National Wildlife Refuge </a>:
              <p>56-795 Kamehameha Highway Kahuku, HI 96731</p></Table.Cell>
            <Table.Cell>
              <p>(808) 637- 6330 ext 4</p><p>(808) 637- 6330 ext 1</p></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>7am-7pm, 7 days/week</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://www.hawaiianhumane.org/'}>Hawaiian Humane Society </a>, 2700 Waialae Ave, Honolulu, HI 9682</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>State</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://dlnr.hawaii.gov/dofaw/'}>O‘ahu Division of Forestry and Wildlife (DOFAW)</a></Table.Cell>
            <Table.Cell><p>(808) 973- 9786</p><p>(808) 295- 5896</p><p>(808) 226- 6050</p></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Licensed rehabber and drop off location</Table.Cell>
            <Table.Cell>24 hours, 7 days/week</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell><a href={'https://www.sealifeparkhawaii.com/'}>Sea Life Park</a>
              <p>41-202 Kalanianaole Hwy, Waimanalo, HI 96795</p>
              <Header as={'h4'}>Not currently permitted</Header>
            </Table.Cell>
            <Table.Cell>(808) 259- 2537</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Drop off location</Table.Cell>
            <Table.Cell>November and December only, 7:45am -4:00pm M-F</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell>Waianae Small Boat Harbor:
              <p>85-491 Farrington Hwy, Waianae, HI 96792</p></Table.Cell>
            <Table.Cell>(808) 697-7095</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
    <Grid.Row>
      <Header
          as="h3"
          textAlign="left"
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
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://dlnr.hawaii.gov/dofaw/'}>Maui Division of Forestry and Wildlife (DOFAW)</a></Table.Cell>
            <Table.Cell>(808) 984- 8100   </Table.Cell>

          </Table.Row>
          <Table.Row>
            <Table.Cell>Maui</Table.Cell>
            <Table.Cell>Seabirds</Table.Cell>
            <Table.Cell><a href={'https://mauinuiseabirds.org/'}>Maui Nui Seabird Recovery Project</a></Table.Cell>
            <Table.Cell>
              (808) 573- BIRD (2473)</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Moloka‘i</Table.Cell>
            <Table.Cell>
              All native species</Table.Cell>
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://dlnr.hawaii.gov/dofaw/'}>Moloka‘i Division of Forestry and Wildlife (DOFAW)</a></Table.Cell>
            <Table.Cell><p>(808) 553- 1745</p><p>(808) 870- 7598</p></Table.Cell>
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
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://dlnr.hawaii.gov/dofaw/'}>Lana‘i Division of Forestry and Wildlife (DOFAW)</a></Table.Cell>
            <Table.Cell><p>(808) 565- 7916</p><p>(808) 357- 5090</p></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Lana‘i licensed rehabber</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell><a href={'https://www.hawaiiwildlifecenter.org/'}>Hawai‘i Wildlife Center</a></Table.Cell>
            <Table.Cell><p>(808) 884- 5000</p><p>(808) 563- 0013</p></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
    <Grid.Row>
      <Header
          as="h3"
          textAlign="left"
          content={'HAWAII ISLAND'}
      />
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
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://dlnr.hawaii.gov/dofaw/'}>East Hawai‘i Division of Forestry and Wildlife (DOFAW)</a></Table.Cell>
            <Table.Cell><p>(808) 974- 4221</p><p>(808) 974- 4229</p><p>(808) 640- 3829</p></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>State</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            {/* eslint-disable-next-line max-len */}
            <Table.Cell><a href={'https://dlnr.hawaii.gov/dofaw/'}>West Hawai‘i Division of Forestry and Wildlife (DOFAW)</a></Table.Cell>
            <Table.Cell><p>(808) 887- 6063</p><p>(808) 339- 0983</p></Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Licensed rehabber</Table.Cell>
            <Table.Cell>All native species</Table.Cell>
            <Table.Cell> <a href={'https://www.hawaiiwildlifecenter.org/'}>Hawai‘i Wildlife Center</a></Table.Cell>
            <Table.Cell>(808) 884- 5000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Licensed rehabber</Table.Cell>
            <Table.Cell>Raptors</Table.Cell>
            <Table.Cell>John Steven Snyder</Table.Cell>
            <Table.Cell>
              (808) 325- 9922</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Row>
  </Grid>
);

export default Resources;
