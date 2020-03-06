import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({navigation}){
  const git_user = navigation.getParam('git_user');
  return <WebView source={{uri:`https://github.com/${git_user}/`}} style = {{flex:1}} />

}

export default Profile;