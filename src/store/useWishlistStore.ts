import {create} from 'zustand';

type WishlistState = {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  addToWishlist: (id) => {
    const updatedList = [...get().wishlist, id];
    set({ wishlist: updatedList });
  },
  removeFromWishlist: (id) => {
    const updatedList = get().wishlist.filter((item) => item !== id);
    set({ wishlist: updatedList });
  },
}));
