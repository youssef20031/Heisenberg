import React, { useState } from 'react';
import styled from 'styled-components';

// Step 3: Create styled components
const Container = styled.div`
    /* Your component specific styles here */
    text-align: center;
`;

const Label = styled.div`
    margin-bottom: 10px;
`;

const InputBox = styled.input`
    width: 200px;
    padding: 8px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;

const Incrementor = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const IncrementBox = styled.div`
    width: 40px;
    padding: 5px;
    text-align: center;
    border: 1px solid #ccc;
    cursor: pointer;
    user-select: none;
`;

const FormExample: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const handleIncrement = () => {
        setCount(prevCount => prevCount + 1);
    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };

    return (
        // Step 2: Use the styled components
        <Container>
            <Label>
                <label htmlFor="label1">Pencil(s)</label>
                {/* Step 3: Use the styled input component */}
                <InputBox type="text" id="label1" />
            </Label>
            <Label>
                <label htmlFor="label2">Label 2:</label>
                <InputBox type="text" id="label2" />
            </Label>
            <Label>
                <label htmlFor="label3">Label 3:</label>
                <InputBox type="text" id="label3" />
            </Label>
            <Label>
                <label htmlFor="label4">Label 4:</label>
                <InputBox type="text" id="label4" />
            </Label>
            <Label>
                <label htmlFor="label5">Label 5:</label>
                <InputBox type="text" id="label5" />
            </Label>
            <Incrementor>
                {/* Step 3: Use the styled increment box component */}
                <IncrementBox onClick={handleDecrement}>-</IncrementBox>
                <div style={{ margin: '0 10px' }}>{count}</div>
                <IncrementBox onClick={handleIncrement}>+</IncrementBox>
            </Incrementor>
        </Container>
    );
};

export default FormExample;
