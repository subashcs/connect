import React from 'react';
import { Platform , Dimensions ,TouchableOpacity  } from 'react-native';
import { createStackNavigator, createDrawerNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Messaging from '../screens/Messaging';
import Notices from '../screens/Notices';
import Network from '../screens/Network';
import BusinessProfile from '../screens/BusinessProfile';
import QRscanner from '../components/sidebar/QRscanner';
import CreateQR from '../components/sidebar/CreateQR';
import PasswordAndPrivacy from '../components/sidebar/PasswordAndPrivacy';
import EditCategories from '../components/sidebar/EditCategories';
import Searches from '../screens/Searches';
import EditProfile  from '../screens/EditProfile';
import MessageWindow from '../screens/MessageWindow';
import Icon from 'react-native-vector-icons/FontAwesome';
import ViewBusiness from '../components/sidebar/ViewBusiness';

import AddBusiness from '../components/sidebar/AddBusiness';
import AddSkills from '../components/sidebar/AddSkills';

import HeaderListNav from '../screens/HeaderListNav';

const HomeStack = createStackNavigator({
  Home: Home,
  BusinessProfile: BusinessProfile,
  QRscanner:QRscanner,
  CreateQR:CreateQR,
  PasswordAndPrivacy:PasswordAndPrivacy,
  EditCategories:EditCategories,
  Searches: Searches,
  ViewBusiness: ViewBusiness,

});



const ProfileStack = createStackNavigator({
  Profile: Profile,
  EditProfile:EditProfile,
  AddBusiness:AddBusiness,
  AddSkills:AddSkills
});

const MessagingStack = createStackNavigator({
  Messaging: Messaging,
  MessageWindow: MessageWindow,

});

const NoticesStack = createStackNavigator({
  Notices: Notices,
});


const NetworkStack = createStackNavigator({
  Network: Network,
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ tintColor }) => (
    <Icon
        name="home"
        color= {tintColor}
        size = {24}
      />
  ),

  
};

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon
        name="user-circle-o"
        color= {tintColor}
        size = {24}
      />
  ),
};

NetworkStack.navigationOptions = {
  tabBarLabel: 'Network',
  tabBarIcon: ({ tintColor }) => (
    <Icon
        name="handshake-o"
        color= {tintColor}
        size = {24}
      />
  ),
  
};

NoticesStack.navigationOptions = {
  tabBarLabel: 'Notices',
  tabBarIcon: ({ tintColor }) => (
    <Icon
        name="bell"
        color= {tintColor}
        size = {24}
      />
  ),
  
};

MessagingStack.navigationOptions = {
  tabBarLabel: 'Messaging',
  tabBarIcon: ({ tintColor }) => (
    <Icon
        name="envelope"
        color= {tintColor}
        size = {24}
      />
  ),
  
};


//botoom naivgator
export const BottomNav = createMaterialBottomTabNavigator({
  HomeStack,
  ProfileStack,
  NetworkStack,
  MessagingStack,
  NoticesStack,
},{
  initialRouteName: 'HomeStack',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#673ab7' },
}
);


//this creates the drawer
export const Drawer = createDrawerNavigator({
  Item1 : {
      screen:BottomNav,
      },
 
  
},
{
  contentComponent: HeaderListNav,
  
  drawerWidth: Dimensions.get('window').width - 80,
}

);

