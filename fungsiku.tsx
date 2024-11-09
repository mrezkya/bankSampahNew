
const backend = () => {
    const fetchData = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
            const data = await response.json();
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
    return fetchData
};


    export default backend