function genMap() {

    const elements = [
        'comet', 'comet',
        'dwarf planet',
        'planet X',
        'asteroid', 'asteroid', 'asteroid', 'asteroid',
        'gas cloud', 'gas cloud',
        'void', 'void'
    ];

    for (let i = 0; i < elements.length; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [elements[i], elements[j]] = [elements[j], elements[i]];
    }

    return elements;
}

export default genMap;