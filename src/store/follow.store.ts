import {create} from 'zustand';

type FollowStoreState = {
  unfollowed: Set<string>; // Using Set for better performance with IDs
  followed: Set<string>;
  isFollowed: (userId: string) => boolean;
  toggleFollow: (userId: string, initialFollow: boolean) => void;
  clearAll: () => void;
  bulkSetFollowed: (userIds: string[]) => void;
  bulkSetUnfollowed: (userIds: string[]) => void;
};

export const useFollowStore = create<FollowStoreState>()((set, get) => ({
  unfollowed: new Set(),
  followed: new Set(),

  isFollowed: (userId: string) => {
    const {followed, unfollowed} = get();
    return followed.has(userId) && !unfollowed.has(userId);
  },

  toggleFollow: (userId: string, initial) => {
    set(state => {
      const newFollowed = new Set(state.followed);
      const newUnfollowed = new Set(state.unfollowed);

      if (initial === true) {
        newFollowed.delete(userId);
        newUnfollowed.add(userId);
      } else {
        newFollowed.add(userId);
        newUnfollowed.delete(userId);
      }

      return {followed: newFollowed, unfollowed: newUnfollowed};
    });
  },

  clearAll: () => set({followed: new Set(), unfollowed: new Set()}),

  bulkSetFollowed: (userIds: string[]) => {
    set(state => ({
      followed: new Set([...state.followed, ...userIds]),
      unfollowed: new Set(
        [...state.unfollowed].filter(id => !userIds.includes(id)),
      ),
    }));
  },

  bulkSetUnfollowed: (userIds: string[]) => {
    set(state => ({
      unfollowed: new Set([...state.unfollowed, ...userIds]),
      followed: new Set(
        [...state.followed].filter(id => !userIds.includes(id)),
      ),
    }));
  },
}));
