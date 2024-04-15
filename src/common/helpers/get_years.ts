export const diffDate = (date = '1900-01-01') => {
    const date1 = new Date()
    const date2 = new Date(date)

    // Dias:
    const dayDefinition = 1000 * 60 * 60 * 24 // Este número es: Milisegundos * segundos * minutos * horas
    const daysDiff = Math.ceil((Math.abs(date1.getTime() - date2.getTime())) / dayDefinition);

    const years = Math.floor(daysDiff / 365.25);
    const remainingDays = Math.floor(daysDiff - (years * 365.25));
    const months = Math.floor((remainingDays / 365.25) * 12);
    const days = Math.ceil(daysDiff - (years * 365.25 + (months / 12 * 365.25)));

    // return `${years} año${years == 1 ? '' : 's'}, ${months} mes${months == 1 ? '' : 'es'}, ${days} dia${days == 1 ? '' : 's'}`
    return `${years} año${years == 1 ? '' : 's'}`
}