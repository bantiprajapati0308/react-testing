import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import UserForm from './UserForm';

test('it shows two inputs and a button', () => {
    render(<UserForm onUserAdd={() => { }} />);
    const inputs = screen.getAllByRole('textbox');
    const button = screen.getByRole('button');
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
})

test('it calls onUserAdd when the form is submitted', async () => {
    const onUserAdd = jest.fn();
    render(<UserForm onUserAdd={onUserAdd} />);
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    await user.type(nameInput, 'test');
    await user.type(emailInput, 'test');
    const button = screen.getByRole('button');
    await user.click(button);
    expect(onUserAdd).toHaveBeenCalledTimes(1);
    expect(onUserAdd).toHaveBeenCalledWith({ name: 'test', email: 'test' });
})