export const convertTime = (report) => {
    // 5:24:08 PM
    // check if am or pm
    let newTime = report.trim();
    newTime = newTime.split(' ');
    newTime[0] = newTime[0].split(':').slice(0, -1);
    if (newTime[1] === 'PM') {
        // convert to int
        newTime[0][0] = parseInt(newTime[0][0], 10);
        // add 12 hours
        newTime[0][0] += 12;
        // convert back to string
        newTime[0][0] = newTime[0][0].toString();
    }
    return newTime[0][0] + newTime[0][1];
};
