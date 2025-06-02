type User = {
  _id: string;
  name: string;
  username: string;
  profileImage: {
    url: string;
  };
  email?: string;
  isFollowing?: boolean;
};

export type {User};
