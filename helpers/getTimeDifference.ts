export const getTimeDifference = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000).getTime();
    const nowDate = new Date().getTime();
    const difference = Math.abs(nowDate - date);
    const diffMinutes = Math.ceil(difference / (1000 * 60))
    const diffHours = Math.ceil(difference / ( 1000 * 60 * 60 ))
    const diffDays = Math.ceil(difference / ( 1000 * 60 * 60 * 24 ))

    let finalDifference;

    if (Number(timestamp) === 0) {
        finalDifference = ''
    } else if (diffHours >= 24) {
        finalDifference = `${diffDays} days ago`
    } else if (diffMinutes >= 60){
        finalDifference = `${diffHours} hours ago`
    } else {
        finalDifference = `${diffMinutes} minutes ago`
    }

    return finalDifference;
}