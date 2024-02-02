import axios from 'axios';

class ApiClient {
    get = async (url: string, headers: object | {}) => {
        return axios.get(url, {
            headers: headers
        })
    }
    post = async (url: string, content: object, headers: object | {}) => {
        return axios.post(url, content, {
            headers: headers
        });
    }
    put = async (url: string, content: object, headers: object | {}) => {
        return axios.put(url, content, {
            headers: headers
        });
    }
    delete = async (url: string, headers: object | {}) => {
        return axios.delete(url, {
            headers: headers
        });
    }
}

const apiClient = new ApiClient();
export default apiClient;