function luckyDraw(player) {
  return new Promise((resolve, reject) => {
    const win = Boolean(Math.round(Math.random()))

    process.nextTick(() => {
      if (win) {
        resolve(`${player} won a prize in the draw!`)
      } else {
        reject(new Error(`${player} lost the draw.`))
      }
    })
  })
}

const players = ['Tina', 'Jorge', 'Julien']

async function getResults(players) {
  await players.forEach(player => {
    luckyDraw(player)
      .then(resolve => console.log(resolve))
      .catch(error => console.log(error))
  })
}

getResults(players)