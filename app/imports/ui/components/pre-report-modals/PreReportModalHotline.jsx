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
        <Header as='h3'>Please call hotline at:
            <a href="tel:8882569840">
                 888-256-9840
            </a>
        </Header>
    );

    const onSubmit = () => {
        if (animal !== 'other') {
            setFinalAnimal(animal);
            setAnimal('');
        } else if (animal === '') {
            // idk what to do here
        } else if (animal === 'other') {
            setFinalAnimal(animal);
            setAnimal('');
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
                <Form.Button type='button' onClick={onSubmit}>Submit</Form.Button>
            </Form.Group>
        </Form>
    );

    const IfOther = () => (
        <div>
            {/* <Header as='h3'>Hello this is if there is other</Header> */}
            <p>
                Unfortunately, HMAR will not be able to respond directly to
                reports not relating to Hawai&apos;i Marine Animals, specifically Hawaiian
                Monk Seals, Sea Turtles, and Sea Birds. Please see our <a href="/#/resources">Resources Page </a>
                for information about other agencies who may provide assistance.
            </p>
        </div>
    );

    const handleOnClose = () => {
        setOpen(false);
        setAnimal('');
        setFinalAnimal('');
    };

    return (
        <Modal
            closeIcon
            onClose={handleOnClose}
            onOpen={() => setOpen(true)}
            centered={false}
            open={open}
            size='tiny'
            trigger={
                <Button size='large' className="ui form button">
                    <h4>Report Animal <br /> In Distress</h4>
                </Button>
            }
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
