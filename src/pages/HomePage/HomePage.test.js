import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, test } from 'vitest';
import HomePage from './HomePage.jsx';

describe('HomePage', () => {
  test('페이지 제목을 렌더링한다', () => {
    render(
      React.createElement(
        MemoryRouter,
        null,
        React.createElement(HomePage),
      ),
    );

    expect(
      screen.getByRole('heading', { name: 'ALLLOG 프로젝트를 시작합니다.' }),
    ).toBeInTheDocument();
  });
});
