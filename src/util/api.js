const fetchData = async (url, { method = 'GET', headers = { 'Content-Type': 'application/json' }, body } = {}) => {
    try {
        return await fetch(url, Object.assign({
            method: method,
            headers: headers,
        }, body ? { body } : {}))
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

const url = 'https://api.github.com/graphql';

const token = '2-7-4-b-0-1-7-e-5-f-a-7-9-b-b-9-b-7-b-b-9-8-8-5-8-6-2-4-7-7-7-7-7-6-f-3-7-c-f-e';

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `token ${token.replace(/-/g,'')}`
}

const getArticleList = async ({ pageSize = 5, after = null, before = null, labels=null }) => {
    return await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            query: `
            {
                repository(owner: "XboxYan", name: "notes") {
                  issues(first: ${pageSize}, states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC},after:${after},before:${before},labels:${labels}) {
                    pageInfo {
                      hasPreviousPage
                      startCursor
                      hasNextPage
                      endCursor
                    }
                    totalCount
                    nodes {
                        number
                        title
                        id
                        createdAt
                        labels(first: 10) {
                            nodes {
                                color
                                name
                                id
                          }
                        }
                    }
                  }
                }
              }
            `
        })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .catch((err) => {
        console.warn(err);
    })
}

const getArticleDetail = async ({ number }) => {
    return await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            query: `
            {
                repository(owner: "XboxYan", name: "notes") {
                  issue(number:${number}) {
                    body
                    number
                    id
                    title
                    createdAt
                    labels(first: 10) {
                        nodes {
                            color
                            name
                            id
                        }
                    }
                  }
                }
              }
            `
        })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .catch((err) => {
        console.warn(err);
    })
}

const getCategory = async () => {
    return await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            query: `
            {
                repository(owner: "XboxYan", name: "notes") {
                  labels(first: 99) {
                          nodes{
                        color
                        description
                        color
                        id
                        isDefault
                        name
                    }
                    totalCount
                  }
                }
              }
            `
        })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .catch((err) => {
        console.warn(err);
    })
}

export { getArticleList,getArticleDetail,getCategory };