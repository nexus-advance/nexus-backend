
export const formatNumber = (value: number, digits = 2): string => {
    if (value == undefined || value == null || isNaN(value)) {
        return '0.00';
    } 
    return value.toFixed(digits);
};

export const formatNumberDecimal = (value: number, digits = 2): number => {
    if (value == undefined || value == null || isNaN(value)) {
        return 0.00;
    } 
    return +value.toFixed(digits);
};