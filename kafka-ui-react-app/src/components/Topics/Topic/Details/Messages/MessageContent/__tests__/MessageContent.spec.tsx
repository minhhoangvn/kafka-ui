import { TextEncoder } from 'util';

import React from 'react';
import { screen } from '@testing-library/react';
import MessageContent, {
  MessageContentProps,
} from 'components/Topics/Topic/Details/Messages/MessageContent/MessageContent';
import { TopicMessageTimestampTypeEnum } from 'generated-sources';
import userEvent from '@testing-library/user-event';
import { render } from 'lib/testHelpers';

const setupWrapper = (props?: Partial<MessageContentProps>) => {
  return (
    <table>
      <tbody>
        <MessageContent
          messageKey='"test-key"'
          messageContent='{"data": "test"}'
          headers={{ header: 'test' }}
          timestamp={new Date(0)}
          timestampType={TopicMessageTimestampTypeEnum.CREATE_TIME}
          {...props}
        />
      </tbody>
    </table>
  );
};

global.TextEncoder = TextEncoder;

describe('MessageContent screen', () => {
  beforeEach(() => {
    render(setupWrapper());
  });
  describe('when switched to display the key', () => {
    it('has a tab with is-active classname', () => {
      const keyTab = screen.getAllByText('Key');
      userEvent.click(keyTab[0]);
      expect(keyTab[0]).toHaveClass('is-active');
    });
    it('displays the key in the JSONViewer', () => {
      const keyTab = screen.getAllByText('Key');
      userEvent.click(keyTab[0]);
      expect(screen.getByTestId('json-viewer')).toBeInTheDocument();
    });
  });

  describe('when switched to display the headers', () => {
    it('has a tab with is-active classname', () => {
      userEvent.click(screen.getByText('Headers'));
      expect(screen.getByText('Headers')).toHaveClass('is-active');
    });
    it('displays the key in the JSONViewer', () => {
      userEvent.click(screen.getByText('Headers'));
      expect(screen.getByTestId('json-viewer')).toBeInTheDocument();
    });
  });

  describe('when switched to display the content', () => {
    it('has a tab with is-active classname', () => {
      userEvent.click(screen.getByText('Headers'));
      const contentTab = screen.getAllByText('Content');
      userEvent.click(contentTab[0]);
      expect(contentTab[0]).toHaveClass('is-active');
    });
  });
});
