import {screens} from '../navigation/screens';

type AuthStackParamList = {
  [screens.login]: undefined;
  [screens.signUp]: undefined;
};

type MainStackParamList = {
  [screens.tabs]: undefined;
  [screens.topTabs]: undefined;
  screens: undefined;
  [screens.home]: undefined;
  [screens.screenNav]: undefined;
  [screens.profile]: undefined;
  [screens.users]: undefined;
};

type HomeParamList = {
  [screens.forYou]: undefined;
  [screens.following]: undefined;
};

export type {AuthStackParamList, MainStackParamList, HomeParamList};
