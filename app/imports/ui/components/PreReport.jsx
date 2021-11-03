import React, { useState } from 'react';
import { Button, Header, Modal, Form, Select } from 'semantic-ui-react';

const PreReport = () => {
    const [open, setOpen] = useState(false);
    const [animal, setAnimal] = useState('');

    const animalOptions = [
        { key: 'h', text:'Hawaiian Monk Seal', value: 'hawaiian monk seal' },
        { key: 's', text:'Sea Turtle', value: 'sea turtle' },
        { key: 'b', text:'Sea Bird', value: 'sea bird' },
        { key: 'o', text:'Other', value: 'other' },
    ]

    const onSubmit = () => {
        if (animal !== 'other') {
            console.log(animal)
        } else {
            console.log('dont make a report')
        }
    }

    return (
        <Modal
            className='pre-report-modal'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            centered={false}
            open={open}
            size='tiny'
            trigger={<Button>Make a report</Button>}
        >
            <Modal.Header>Report</Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            options={animalOptions}
                            placeholder='Animal'
                            search
                            onChange={(value) => setAnimal(value)}
                        />
                        <Form.Button onClick={onSubmit()}>Submit</Form.Button>
                    </Form.Group>
                </Form>
            </Modal.Content>

        </Modal>
    );
}

export default PreReport;
