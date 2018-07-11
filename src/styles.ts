export const defaultStyles = {
    fontFamily: 'Arial',
    brandColor: '#0019a8',
    touchableHighlight: {
        activeOpacity: 0.2, 
        underlayColor: 'white' 
    },
    borderColor: '#f5f5f5',
}

export interface RoundelInfo {
    text: string;
    ringColor: string;
    barColor: string;
    textColor: string;
}

export const roundels: RoundelInfo[] = [
    {
        text: 'Underground',
        ringColor: '#cc3333',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'Overground',
        ringColor: '#ff630a',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'Crossrail',
        ringColor: '#5c3f9d',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'DLR',
        ringColor: '#00aca8',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'Trams',
        ringColor: '#62ba48',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'Taxi Private Hire',
        ringColor: '#6f80bf',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'Coach Station',
        ringColor: '#fdbc17',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'River',
        ringColor: '#029cdc',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, { 
        text: 'Rail',
        ringColor: '#af6116',
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'Bakerloo',
        ringColor: '#af6116',
        barColor: '#af6116',
        textColor: 'white',
    }, {
        text: 'Central',
        ringColor: '#ee4329',
        barColor: '#ee4329',
        textColor: 'white'
    }, {
        text: 'Circle',
        ringColor: '#fedc00',
        barColor: '#fedc00',
        textColor: defaultStyles.brandColor,
    }, {
        text: 'District',
        ringColor: '#01985b',
        barColor: '#01985b',
        textColor: 'white',
    }, {
        text: 'Hammersmith & City',
        ringColor: '#f384a2',
        barColor: '#f384a2',
        textColor: defaultStyles.brandColor,
    }, {
        text: 'Jubilee',
        ringColor: '#939498',
        barColor: '#939498',
        textColor: 'white',
    }, {
        text: 'Metropolitan',
        ringColor: '#79004f',
        barColor: '#79004f',
        textColor: 'white',
    }, {
        text: 'Northern',
        ringColor: 'black',
        barColor: 'black',
        textColor: 'white',
    }, {
        text: 'Piccadilly',
        ringColor: defaultStyles.brandColor,
        barColor: defaultStyles.brandColor,
        textColor: 'white',
    }, {
        text: 'Victoria',
        ringColor: '#029cdc',
        barColor: '#029cdc',
        textColor: 'white',
    }, {
        text: 'Wateroloo & City',
        ringColor: '#78cabc',
        barColor: '#78cabc',
        textColor: defaultStyles.brandColor,
    }, 
];
