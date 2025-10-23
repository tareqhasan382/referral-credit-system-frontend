import useAuthStore from "@/store/useAuthStore";

const useStore = () => ({
    userStore:useAuthStore()
});

export default useStore;
