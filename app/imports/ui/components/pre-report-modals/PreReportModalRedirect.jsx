import React, { useState } from 'react';
import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react';

const PreReportModalRedirect = () => {
    const [open, setOpen] = useState(false);
    const [animal, setAnimal] = useState(() => '');
    const [finalAnimal, setFinalAnimal] = useState('');

    const animalOptions = [
        { key: 'h', text: 'Hawaiian Monk Seal', value: 'hawaiian monk seal' },
        { key: 's', text: 'Sea Turtle', value: 'sea turtle' },
        { key: 'b', text: 'Sea Bird', value: 'sea bird' },
        { key: 'o', text: 'Other', value: 'other' },
    ];

    const Hotline = () => (
        <Header as='h3'>Later send to report page</Header>
    );

    const onSubmit = () => {
        // console.log(animal);
        // setOpen(false)

        if (animal !== 'other') {
            // todo
            console.log('HMAR CANT RESPOND');
            console.log(animal);
            setFinalAnimal(animal);
            setAnimal('');
            // setOpen(false)
        } else if (animal === '') {
            // idk what to do here
        } else if (animal === 'other') {
            // todo
            console.log('send to report page');
            console.log(animal);
            setFinalAnimal(animal);
            setAnimal('');
            // setOpen(false);
        }

    };

    const AnimalForm = () => (
        <Form>
            <Form.Group widths='equal'>
                <Form.Field>
                    <h4>Type of Animal</h4>
                    <Dropdown
                        placeholder='Select Animal'
                        selection
                        options={animalOptions}
                        onChange={(e, { value }) => {
                            setAnimal(value);
                        }}
                        value={animal}
                    />
                </Form.Field>
                {/* <Button onClick={onSubmit()}>Submit</Button> */}
                <Form.Button type='button' onClick={onSubmit}>Submit</Form.Button>
            </Form.Group>
        </Form>
    );

    const IfOther = () => (
        <div>
            <Header as='h3'>Hello this is if there is other</Header>
            <p>
                Unfortunately, HMAR will not be able to respond directly to
                reports not relating to Hawai&apos;i Marine Animals, specifically Hawaiian
                Monk Seals, Sea Turtles, and Sea Birds. Please see our Resources Page
                for information about other agencies who may provide assistance.
            </p>
        </div>
    );

    return (
        <Modal
            closeIcon
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            centered={false}
            open={open}
            size='tiny'
            trigger={<Button size='medium' className="ui form button">Report Sighting</Button>}
        >
            <Modal.Header>Report</Modal.Header>
            <Modal.Content>
                {
                  // eslint-disable-next-line no-nested-ternary
                    finalAnimal === '' ?
                        (
                            // do this if finalAnimal has not been set yet
                            <AnimalForm/>
                        ) : (
                            // do this if finalAnimal is other
                            finalAnimal === 'other' ?
                                (
                                    <IfOther/>
                                ) : (
                                    // else finalAnimal is something other than other
                                    // show hotline
                                    <Hotline/>
                                )
                        )
                }
            </Modal.Content>

        </Modal>
    );
};

export default PreReportModalRedirect;
