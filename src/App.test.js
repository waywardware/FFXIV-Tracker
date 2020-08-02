import React from 'react';
import expect from 'expect'
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

test('renders learn react link', async () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const items = await screen.findAllByPlaceholderText("Search...")
  expect(items).toHaveLength(1);
});