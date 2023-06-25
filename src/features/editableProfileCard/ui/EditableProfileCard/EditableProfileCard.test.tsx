import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { ComponentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { Profile } from '@/entities/Profile';
import { Country, Currency } from '@/shared/const/common';
import { $api } from '@/shared/api/api';
import { profileReducer } from '../../model/slice/profileSlice';
import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'admin',
  age: 36,
  currency: Currency.EUR,
  country: Country.Armenia,
  city: 'Erevan',
  username: 'admin123',
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: {
        id: '1',
        username: 'admin123',
      },
    },
  },
  asyncReducers: {
    profile: profileReducer,
  },
};

describe('features/EditableProfileCard', () => {
  test('Mode ReadOnly must be Deactivate', async () => {
    ComponentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    ).toBeInTheDocument();
  });

  test('Mode ReadOnly must be Activate', async () => {
    ComponentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.LastName'));
    await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'Tomas');
    await userEvent.type(screen.getByTestId('ProfileCard.LastName'), 'Sharp');

    expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('Tomas');
    expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('Sharp');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton'),
    );

    expect(screen.getByTestId('ProfileCard.FirstName')).toHaveValue('admin');
    expect(screen.getByTestId('ProfileCard.LastName')).toHaveValue('admin');
  });

  test('Testing validation', async () => {
    ComponentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    );

    expect(
      screen.getByTestId('EditableProfileCard.Error.Paragraph'),
    ).toBeInTheDocument();
  });

  test('Send request', async () => {
    const mockPutReq = jest.spyOn($api, 'put');
    ComponentRender(<EditableProfileCard id="1" />, options);

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton'),
    );

    await userEvent.clear(screen.getByTestId('ProfileCard.FirstName'));
    await userEvent.type(screen.getByTestId('ProfileCard.FirstName'), 'Tomas');

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton'),
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
