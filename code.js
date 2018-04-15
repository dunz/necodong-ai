const decks = [
    {num: 1, win: [5, '!'], lose: [2, 3, 4]},
    {num: 2, win: [1], lose: [3, 4, 5, '!']},
    {num: 3, win: [1, 2, '!'], lose: [4, 5]},
    {num: 4, win: [1, 2, 3], lose: [5, '!']},
    {num: 5, win: [2, 3, 4, '!'], lose: [1]},
    {num: '!', win: [2, 4], lose: [1, 3, 5]}
];

function getRemainDeck(history) {
    const myHistory = [];
    const enemyHistory = [];
    history.forEach(deckArr => {
        myHistory.push(deckArr[0]);
        enemyHistory.push(deckArr[1]);
    });

    return decks.reduce((remain, deck) => {
        if (!myHistory.includes(deck.num)) {
            const newWin = deck.win.filter(win => !enemyHistory.includes(win));
            const newLose = deck.lose.filter(lose => !enemyHistory.includes(lose));
            remain.push({
                ...deck,
                win: newWin,
                lose: newLose,
                winRate: newWin.length / (newWin.length + newLose.length) * 100
            });
        }
        return remain;
    }, []);
}

function think(hands, history, old_games) {
    const remainDeck = getRemainDeck(history);
    remainDeck.sort((a, b) => a.winRate - b.winRate);
    return remainDeck[0].num;
}
