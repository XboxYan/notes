const fetchData = async (url, { method = 'GET', headers = { 'Content-Type': 'application/json' }, body } = {}) => {
    try {
        return await fetch(url, Object.assign({
            method: method,
            headers: headers,
        },body?{body}:{}))
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .catch((err) => {
            console.warn(err);
        })
    } catch (error) {
        console.err(error)
    }
}

export default fetchData;