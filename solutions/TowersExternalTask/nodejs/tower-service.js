const {
  ExternalTaskFinished,
} = require('@process-engine/external_task_api_contracts');


class TowerService {

  constructor() {
    this.towers = [['A', 'B', 'C'], [], []];
    this._displayTowers('This is the start position.');
  }

  async takeElement(externalTask) {

    const fromIndex = externalTask.payload;
    const element = this.towers[fromIndex].shift();

    await this._sleepOneSecond();
    this._displayTowers(`Take element ${element} from ${fromIndex}.`);

    return new ExternalTaskFinished(externalTask.id, element);
  }

  async putElement(externalTask) {

    const {element, toIndex} = externalTask.payload;
    this.towers[toIndex].unshift(element);

    await this._sleepOneSecond();
    this._displayTowers(`Put element ${element} to ${toIndex}.`);

    return new ExternalTaskFinished(externalTask.id);
  }

  async checkIfEmpty(externalTask) {

    const towerIndex = externalTask.payload;
    const towerIsEmpty = this.towers[towerIndex].length === 0;

    return new ExternalTaskFinished(externalTask.id, towerIsEmpty);
  }

  async _sleepOneSecond() {

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  _displayTowers(subtitle) {
    const maxHeight = this.towers.reduce((size, tower) =>
                               Math.max(tower.length, size), 0);

    const sameLengthTowers = this.towers.map((tower) => {
      const emptySlotsLength = maxHeight - tower.length;
      const emptySlots = Array(emptySlotsLength).fill(' ');
      return emptySlots.concat(tower);
    });

    let lines = '';
    for (let i = 0; i < maxHeight; i++) {

      const newLine = sameLengthTowers
            .reduce((text, tower) => `${text} ${tower[i]}`, '');
      lines = `${lines}\n${newLine}`
    }

    const underscore =' ' + '-'.repeat(sameLengthTowers.length * 2 - 1);
    const numbers = Array.from(sameLengthTowers.keys())
          .reduce((acc, cur) => acc + ' ' + cur);

    let output = lines + '\n'
        + underscore + '\n '
        + numbers + '\n'
        + subtitle + '\n\n';

    console.log(output)
  }
}


module.exports.TowerService = TowerService;
