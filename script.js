const CARD_COUNT = 5;
const BOMB_COUNT = 2;

const cardGrid = document.getElementById('cardGrid');
const resetBtn = document.getElementById('resetBtn');

function createDeck() {
  const outcomes = [
    ...Array(CARD_COUNT - BOMB_COUNT).fill('WIN'),
    ...Array(BOMB_COUNT).fill('BOMB')
  ];

  for (let i = outcomes.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [outcomes[i], outcomes[j]] = [outcomes[j], outcomes[i]];
  }

  return outcomes;
}

function createCard(outcome, index) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'card';
  card.setAttribute('aria-label', `Card ${index + 1}`);

  const inner = document.createElement('span');
  inner.className = 'card-inner';

  const front = document.createElement('span');
  front.className = 'card-face card-front';
  front.textContent = 'Flip Me';

  const back = document.createElement('span');
  back.className = 'card-face card-back';
  back.textContent = outcome;

  if (outcome === 'WIN') {
    card.classList.add('win');
  }

  inner.append(front, back);
  card.append(inner);

  card.addEventListener('click', () => {
    card.classList.add('flipped');
    card.disabled = true;
  });

  return card;
}

function renderGame() {
  const deck = createDeck();
  cardGrid.innerHTML = '';

  deck.forEach((outcome, index) => {
    cardGrid.append(createCard(outcome, index));
  });
}

resetBtn.addEventListener('click', renderGame);

renderGame();
