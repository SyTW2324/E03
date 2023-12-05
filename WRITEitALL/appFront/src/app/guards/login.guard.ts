export const loginGuard = () => {

    const token = localStorage.getItem('user_token');
    if (token) {
        return true;
    } else {
        return false;
    }
}