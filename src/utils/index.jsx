import axios from 'axios';

export const generateAmountOptions = (number) => {
    return Array.from({ length: number }, (_, index) => {
        const amount = index + 1;

        return (
            <option key={amount} value={amount}>
                {amount}
            </option>
        );
    });
};
export const customFetch = axios.create({
    baseURL: 'http://localhost:5173/data/',
});
