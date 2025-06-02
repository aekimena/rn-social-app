import {User} from './user';

type Post = {
  _id: string;
  caption: string;
  owner: User;
  images: {url: string}[];
  createdAt: Date;
};

export type {Post};
