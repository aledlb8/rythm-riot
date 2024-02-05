export type Challenge = {
    melodyType: string;
    drumType: string;
    genre: string;
    tempo: number;
    key: string;
};

// Define enhanced types with compatibility considerations
type GenreInfo = {
    name: string;
    compatibleMelodies: string[];
    compatibleDrums: string[];
    tempoRange: [number, number]; // [min, max] tempo in BPM
};
const genres: GenreInfo[] = [
    {
        name: 'Hip Hop',
        compatibleMelodies: ['Chord Progression', 'Lead', 'Sample-based'],
        compatibleDrums: ['Trap', 'Boom Bap', 'Lo-fi'],
        tempoRange: [85, 95],
    },
    {
        name: 'Electronic',
        compatibleMelodies: ['Arpeggio', 'Lead', 'Bassline'],
        compatibleDrums: ['House', 'Techno', 'Breakbeat'],
        tempoRange: [120, 130],
    },
    {
        name: 'Pop',
        compatibleMelodies: ['Chord Progression', 'Lead', 'Hook'],
        compatibleDrums: ['Electronic', 'Acoustic'],
        tempoRange: [100, 120],
    },
    {
        name: 'Jazz',
        compatibleMelodies: ['Swing', 'Bebop Lines', 'Modal'],
        compatibleDrums: ['Brushes', 'Swing'],
        tempoRange: [60, 180],
    },
    {
        name: 'Rock',
        compatibleMelodies: ['Riff', 'Power Chords'],
        compatibleDrums: ['Rock Beat', 'Hard Rock'],
        tempoRange: [110, 140],
    },
    {
        name: 'Classical',
        compatibleMelodies: ['Counterpoint', 'Orchestral Themes'],
        compatibleDrums: ['None (Orchestral Percussion)'],
        tempoRange: [40, 180],
    },
    {
        name: 'Reggae',
        compatibleMelodies: ['Off-beat Chords', 'Dub'],
        compatibleDrums: ['One Drop', 'Steppers'],
        tempoRange: [60, 90],
    },
    {
        name: 'Blues',
        compatibleMelodies: ['12-bar Blues', 'Slide Guitar'],
        compatibleDrums: ['Shuffle', 'Slow Blues'],
        tempoRange: [50, 120],
    },
    {
        name: 'Country',
        compatibleMelodies: ['Twangy Guitar', 'Banjo Rolls'],
        compatibleDrums: ['Train Beat', 'Brushes'],
        tempoRange: [80, 120],
    },
    {
        name: 'Metal',
        compatibleMelodies: ['Heavy Riffs', 'Shredding Solos'],
        compatibleDrums: ['Double Bass', 'Blast Beats'],
        tempoRange: [100, 200],
    },
    {
        name: 'R&B',
        compatibleMelodies: ['Smooth Vocals', 'Soulful Chords'],
        compatibleDrums: ['Electronic R&B', 'Classic Breaks'],
        tempoRange: [60, 90],
    },
    {
        name: 'Lo-fi',
        compatibleMelodies: ['Sample-based', 'Synth Pads'],
        compatibleDrums: ['Lo-fi Hip Hop', 'Downtempo'],
        tempoRange: [70, 90],
    },
    {
        name: 'Techno',
        compatibleMelodies: ['Synth Stabs', 'Acid Basslines'],
        compatibleDrums: ['Four on the Floor', 'Industrial'],
        tempoRange: [120, 150],
    },
    {
        name: 'House',
        compatibleMelodies: ['Piano Chords', 'Synth Leads'],
        compatibleDrums: ['Four on the Floor', 'Deep House'],
        tempoRange: [115, 130],
    },
];


const keys = ['C Major', 'A Minor', 'G Major', 'E Minor', 'D Major', 'B Minor'];

function getRandomElement<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export const generateRandomChallenge = (): Challenge => {
    const selectedGenre = getRandomElement(genres);
    const melodyType = getRandomElement(selectedGenre.compatibleMelodies);
    const drumType = getRandomElement(selectedGenre.compatibleDrums);
    const tempo = Math.floor(Math.random() * (selectedGenre.tempoRange[1] - selectedGenre.tempoRange[0] + 1)) + selectedGenre.tempoRange[0];
    const key = getRandomElement(keys);

    return {
        genre: selectedGenre.name,
        melodyType,
        drumType,
        tempo,
        key,
    };
}