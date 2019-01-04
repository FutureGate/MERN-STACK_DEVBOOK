const isEmpty = (value) => {
    return(
        value === undefined ||
        value === null      ||
        // eslint-disable-next-line
        (typeof value === 'object' && Object.keys(value).length === 0)  ||
        // eslint-disable-next-line
        (typeof value === 'string' && value.trim().length === 0)
    );
}

export default isEmpty;
