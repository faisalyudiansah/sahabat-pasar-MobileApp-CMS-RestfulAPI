export const formatPriceToIDR = (price) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    return formatter.format(price);
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatTimestampToDateString = (timestamp) => {
    const dateObject = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return dateObject.toLocaleDateString('en-US', options);
}

export const formatTimestampToTimeString = (timestamp) => {
    const dateObject = new Date(timestamp);
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    return dateObject.toLocaleTimeString('en-US', options);
}