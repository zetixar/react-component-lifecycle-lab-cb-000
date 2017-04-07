import React from 'react';
import Tweet from './Tweet';

export default class TweetWall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }

  componentWillMount() {
    this.setState({
      tweets: this.props.newTweets
    });
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.newTweets.length > 0;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tweets: [...nextProps.newTweets, ...this.state.tweets]
    });
  }

  render() {
    const tweets = this.state.tweets.map((tweet, index) => {
      return <Tweet text={tweet.text} key={index} />
    });
    return (
      <div>{tweets}</div>
    );
  }
}
