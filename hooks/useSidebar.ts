import { create } from "zustand";

export type SidebarStore = {
    open: boolean;
    toggle: () => void;
};

export const useSidebar = create<SidebarStore>((set, get) => ({
    open: true,
    toggle: () => set((state) => ({ open: !state.open })),
}));