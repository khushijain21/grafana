import { render, screen } from '@testing-library/react';
import React from 'react';

import { config } from '@grafana/runtime';

import { createEmptyQueryResponse } from '../../../explore/state/utils';
import { PanelModel } from '../../state';
import { createDashboardModelFixture } from '../../state/__fixtures__/dashboardFixtures';

import { PanelHeader } from './PanelHeader';

let panelModel = new PanelModel({
  id: 1,
  gridPos: { x: 1, y: 1, w: 1, h: 1 },
  type: 'type',
  title: 'title',
});

let panelData = createEmptyQueryResponse();

describe('Panel Header', () => {
  const dashboardModel = createDashboardModelFixture({}, {});
  it('will render header title but not render dropdown icon when dashboard is being viewed publicly', () => {
    window.history.pushState({}, 'Test Title', '/public-dashboards/abc123');
    config.publicDashboardAccessToken = 'abc123';

    render(
      <PanelHeader panel={panelModel} dashboard={dashboardModel} isViewing={false} isEditing={false} data={panelData} />
    );

    expect(screen.getByText('title')).toBeDefined();
    expect(screen.queryByTestId('panel-dropdown')).toBeNull();
  });

  it('will render header title and dropdown icon when dashboard is not being viewed publicly', () => {
    const dashboardModel = createDashboardModelFixture({}, {});
    window.history.pushState({}, 'Test Title', '/d/abc/123');
    config.publicDashboardAccessToken = '';

    render(
      <PanelHeader panel={panelModel} dashboard={dashboardModel} isViewing={false} isEditing={false} data={panelData} />
    );

    expect(screen.getByText('title')).toBeDefined();
    expect(screen.getByTestId('panel-dropdown')).toBeDefined();
  });
});
