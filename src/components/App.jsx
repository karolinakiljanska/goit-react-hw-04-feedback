import React, { useState } from 'react';
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

const App = () => {
  const [stats, setStats] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const onLeaveFeedback = name => {
    setStats(prevState => {
      const value = prevState[name];
      return {
        ...prevState,
        [name]: value + 1,
      };
    });
  };

  function countTotalFeedback() {
    return stats.good + stats.neutral + stats.bad;
  }

  function countPositiveFeedbackPercentage() {
    return Math.round((stats.good / countTotalFeedback()) * 100);
  }

  return (
    <div className={CSS.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(stats)}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={stats.good}
            neutral={stats.neutral}
            bad={stats.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
