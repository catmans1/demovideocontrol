/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import MusicControl from 'react-native-music-control';

const url_video =
  'https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_20mb.mp4';
export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    MusicControl.setNowPlaying({
      title: 'demo',
      artwork: 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
      artist: '',
      album: 'album',
      genre: '',
      duration: 10000, // (Seconds)
      description: '', // Android Only
      // color: 0xFFFFFF, // Notification Color - Android Only
      date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
      // rating: 84, // Android Only (Boolean or Number depending on the type)
      // notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
    });
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);

    MusicControl.enableControl('skipBackward', true, {interval: 10});
    MusicControl.enableControl('skipForward', true, {interval: 10});
    MusicControl.enableControl('previousTrack', true);
    MusicControl.enableControl('nextTrack', true);

    if (Platform.OS === 'android')
      MusicControl.enableControl('closeNotification', true, {when: 'paused'});

    MusicControl.on('play', () => {
      this.setPause(false);
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
      });
    });
    MusicControl.on('pause', () => {
      this.setPause(true);
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED,
      });
    });
    MusicControl.on('skipForward', () => {
      // this.goToForward10();
    });
    MusicControl.on('skipBackward', () => {
      // this.goToBackward10();
    });
    MusicControl.on('nextTrack', () => {
      // this.goToNextMedia(lectureList);
    });

    MusicControl.on('previousTrack', () => {
      // this.goToPrevMedia(lectureList);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.backgroundVideo}
          source={{
            uri: url_video,
          }}
          ref={ref => {
            this.player = ref;
          }}
          playInBackground={true}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          allowsExternalPlayback
          resizeMode="cover"
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    flex: 1,
  },
});
