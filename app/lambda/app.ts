import axios from 'axios';

export async function handler(event: any, context: any) {
    const url = 'https://www.amazon.co.jp/'
    const res = await axios.get(url)
    console.log(res)
};
