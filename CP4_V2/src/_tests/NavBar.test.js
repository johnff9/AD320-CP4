import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/NavBar'; // Adjust the import path if necessary
import userEvent from '@testing-library/user-event'; // Import for simulating user interactions

describe('NavBar Component', () => {
  test('renders navigation links correctly', () => {
    render(
      <Router>
        <NavBar />
      </Router>
    );

    // Check if the Home, Login, and Cart links are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Cart')).toBeInTheDocument();
  });

  test('applies "active" class to the active link when clicked', async () => {
    const user = userEvent.setup();
    render(
      <Router>
        <NavBar />
      </Router>
    );

    const homeLink = screen.getByText('Home');
    const loginLink = screen.getByText('Login');
    const cartLink = screen.getByText('Cart');

    // Simulate clicking on each link and verify the "active" class
    await user.click(homeLink);
    expect(homeLink).toHaveClass('active');
    expect(loginLink).not.toHaveClass('active');
    expect(cartLink).not.toHaveClass('active');

    await user.click(loginLink);
    expect(loginLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
    expect(cartLink).not.toHaveClass('active');

    await user.click(cartLink);
    expect(cartLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
    expect(loginLink).not.toHaveClass('active');
  });
});
