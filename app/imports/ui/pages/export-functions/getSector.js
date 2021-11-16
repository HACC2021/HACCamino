export const getSector = (lat, lng) => {
    // lat is up and down, lng is left to right
    const kaenaPoint = [21.574656, -158.278203];
    const kualoaRanch = [21.515948, -157.838797];
    const sandys = [21.285269, -157.674735];
    const hickam = [21.331764, -157.969983];
    // north
    if (lat > kaenaPoint[0] && lat > kualoaRanch[0]) {
        return 'North';
    }
    // east 21.518216, -157.854436 21.308637, -157.650264
    if (lat < kualoaRanch[0] && lat > sandys[0] && lng > -157.854436 && lng < -157.650264) {
        return 'East';
    }
    // south 21.327657, -157.964463
    if (lat < 21.327657 && lng > -157.964463 && lng < sandys[1]) {
        return 'South';
    }
    // west 21.296312, -158.098702
    if (lat > 21.296312 && lng > kaenaPoint[1] && lng < hickam[1]) {
        return 'West';
    }
    return '';
};

/*
shore visual: http://www.hawaiiinfoguide.com/map-oahu-beaches.asp
north shore:
left: 21.573968, -158.275712
right: 21.516162, -157.837763

average lat = 21.545065

east shore:
kualoa ranch lower: 21.517327, -157.836347
sandys lower: 21.292902, -157.660507

south shore:
sandy's: 21.285846, -157.671374
hickam: 21.331755, -157.968540

west shore:
ewa: 21.333809, -157.973454
ka'ena point lower: 21.574519, -158.279767

*/
// testing
// console.log(getSector(21.301349, -157.882456));
