const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d
        .getDate()
        .toString()
        .padStart(2, '0')}/${d.getFullYear()}`;
};

module.exports = {formatDate};
