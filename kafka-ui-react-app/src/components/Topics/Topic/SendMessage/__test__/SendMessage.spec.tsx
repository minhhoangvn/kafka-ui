import React from 'react';
import SendMessage, {
  Props,
} from 'components/Topics/Topic/SendMessage/SendMessage';
import { MessageSchemaSourceEnum } from 'generated-sources';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from 'lib/testHelpers';

jest.mock('json-schema-faker', () => ({
  generate: () => ({
    f1: -93251214,
    schema: 'enim sit in fugiat dolor',
    f2: 'deserunt culpa sunt',
  }),
  option: jest.fn(),
}));

const setupWrapper = (props?: Partial<Props>) => (
  <SendMessage
    clusterName="testCluster"
    topicName="testTopic"
    fetchTopicMessageSchema={jest.fn()}
    sendTopicMessage={jest.fn()}
    messageSchema={{
      key: {
        name: 'key',
        source: MessageSchemaSourceEnum.SCHEMA_REGISTRY,
        schema: `{
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "$id": "http://example.com/myURI.schema.json",
          "title": "TestRecord",
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "f1": {
              "type": "integer"
            },
            "f2": {
              "type": "string"
            },
            "schema": {
              "type": "string"
            }
          }
        }
        `,
      },
      value: {
        name: 'value',
        source: MessageSchemaSourceEnum.SCHEMA_REGISTRY,
        schema: `{
          "$schema": "https://json-schema.org/draft/2020-12/schema",
          "$id": "http://example.com/myURI1.schema.json",
          "title": "TestRecord",
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "f1": {
              "type": "integer"
            },
            "f2": {
              "type": "string"
            },
            "schema": {
              "type": "string"
            }
          }
        }
        `,
      },
    }}
    schemaIsFetched={false}
    messageIsSending={false}
    partitions={[
      {
        partition: 0,
        leader: 2,
        replicas: [
          {
            broker: 2,
            leader: false,
            inSync: true,
          },
        ],
        offsetMax: 0,
        offsetMin: 0,
      },
      {
        partition: 1,
        leader: 1,
        replicas: [
          {
            broker: 1,
            leader: false,
            inSync: true,
          },
        ],
        offsetMax: 0,
        offsetMin: 0,
      },
    ]}
    {...props}
  />
);

describe('SendMessage', () => {
  it('calls fetchTopicMessageSchema on first render', () => {
    const fetchTopicMessageSchemaMock = jest.fn();
    render(
      setupWrapper({ fetchTopicMessageSchema: fetchTopicMessageSchemaMock })
    );
    expect(fetchTopicMessageSchemaMock).toHaveBeenCalledTimes(1);
  });

  describe('when schema is fetched', () => {
    it('calls sendTopicMessage on submit', async () => {
      jest.mock('../validateMessage', () => jest.fn().mockReturnValue(true));
      const mockSendTopicMessage = jest.fn();
      render(
        setupWrapper({
          schemaIsFetched: true,
          sendTopicMessage: mockSendTopicMessage,
        })
      );
      userEvent.selectOptions(screen.getByLabelText('Partition'), '1');
      await waitFor(async () => {
        userEvent.click(await screen.findByText('Send'));
        expect(mockSendTopicMessage).toHaveBeenCalledTimes(1);
      });
    });
  });
});
