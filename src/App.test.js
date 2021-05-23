import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { ConnectedRouter } from 'connected-react-router';
import expect from 'expect';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store, { history } from './app/store';


test('renders learn react link', async () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );

  const items = await screen.findAllByPlaceholderText("Search...")
  expect(items).toHaveLength(1);
});