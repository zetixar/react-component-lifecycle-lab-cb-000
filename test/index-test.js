import React from 'react';
import { shallow, mount } from 'enzyme';

import App from '../components/App';
import TweetWall from '../components/TweetWall';

describe('App', () => {
  it('will fetch a set of tweets on the initial render', () => {
    const spy = expect.spyOn(App.prototype, 'fetchTweets');
    const wrapper = shallow(<App />);
    expect(spy.calls.length).toEqual(1);
  });

  it('sets up the interval updating the tweets every few seconds', () => {
    const spy = expect.spyOn(App.prototype, 'startInterval');
    const wrapper = mount(<App />);
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.length).toEqual(1);
    App.prototype.startInterval.restore();
  });

  it('cleans up the interval when the component is destroyed', () => {
    const spy = expect.spyOn(App.prototype, 'cleanUpInterval');
    const wrapper = mount(<App />);
    wrapper.unmount();
    expect(spy).toHaveBeenCalled();
    expect(spy.calls.length).toEqual(1);
    App.prototype.cleanUpInterval.restore();
  });

  it('updates the charting library whenever new tweets are received', () => {
    const spy = expect.spyOn(App.prototype, 'updateChart');
    const wrapper = shallow(<App />);
    wrapper.setState({ latestTweets: ['one', 'two', 'three'] });
    expect(spy.calls.length).toEqual(1);
    expect(spy).toHaveBeenCalledWith(3);
  });
});

describe('TweetWall', () => {
  it('will save the first lot of newTweets into the state at componentWillMount', () => {
    const wrapper = shallow(<TweetWall newTweets={['I am a tweet!']} />);
    expect(wrapper.state()).toEqual({ tweets: ['I am a tweet!'] });
  });

  it('updates the state to incorporate new tweets', () => {
    const wrapper = shallow(<TweetWall newTweets={['I am a tweet!']} />);
    wrapper.setProps({ newTweets: ['I am also a tweet!'] });
    expect(wrapper.state()).toEqual({ tweets: ['I am also a tweet!', 'I am a tweet!'] });
  });

  it('updates the state to incorporate new tweets', () => {
    const spy = expect.spyOn(App.prototype, 'cleanUpInterval');
    const wrapper = shallow(<TweetWall newTweets={['I am a tweet!']} />);
    wrapper.setProps({ newTweets: ['I am also a tweet!'] });
    expect(wrapper.state()).toEqual({ tweets: ['I am also a tweet!', 'I am a tweet!'] });
  });

  it('does not rerender when there are no new tweets', () => {
    const spy = expect.spyOn(TweetWall.prototype, 'render').andCallThrough();
    const wrapper = shallow(<TweetWall newTweets={['I am a tweet!']}  />);
    wrapper.setProps({ newTweets: [] });
    expect(spy.calls.length).toEqual(1);
  });
});
