import React from 'react';
import { Switch, Route, useParams } from 'react-router-dom';
import { ClusterName, TopicName } from 'redux/interfaces';
import EditContainer from 'components/Topics/Topic/Edit/EditContainer';
import DetailsContainer from 'components/Topics/Topic/Details/DetailsContainer';
import PageLoader from 'components/common/PageLoader/PageLoader';

import SendMessageContainer from './SendMessage/SendMessageContainer';

interface RouterParams {
  clusterName: ClusterName;
  topicName: TopicName;
}

interface TopicProps {
  isTopicFetching: boolean;
  fetchTopicDetails: (clusterName: ClusterName, topicName: TopicName) => void;
}

const Topic: React.FC<TopicProps> = ({
  isTopicFetching,
  fetchTopicDetails,
}) => {
  const { clusterName, topicName } = useParams<RouterParams>();

  React.useEffect(() => {
    fetchTopicDetails(clusterName, topicName);
  }, [fetchTopicDetails, clusterName, topicName]);

  if (isTopicFetching) {
    return <PageLoader />;
  }

  return (
    <Switch>
      <Route
        exact
        path="/ui/clusters/:clusterName/topics/:topicName/edit"
        component={EditContainer}
      />
      <Route
        exact
        path="/ui/clusters/:clusterName/topics/:topicName/message"
        component={SendMessageContainer}
      />
      <Route
        path="/ui/clusters/:clusterName/topics/:topicName"
        component={DetailsContainer}
      />
    </Switch>
  );
};

export default Topic;
