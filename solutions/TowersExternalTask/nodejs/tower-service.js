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
    const element = this.towers[fromIndex].pop();

    this._displayTowers(`Take element ${element} from ${fromIndex}.`);
    return new ExternalTaskFinished(externalTask.id, element);
  }

  async putElement(externalTask) {

    const {element, toIndex} = externalTask.payload;
    this.towers[toIndex].push(element);

    this._displayTowers(`Put element ${element} to ${toIndex}.`);
    return new ExternalTaskFinished(externalTask.id);
  }

  async showTowers(externalTask) {

    return new ExternalTaskFinished(externalTask.id, JSON.stringify(this.towers));
  }

  async checkIfEmpty(externalTask) {

    const towerIndex = externalTask.payload;
    const towerIsEmpty = this.towers[towerIndex].length === 0;

    return new ExternalTaskFinished(externalTask.id, towerIsEmpty);
  }

  _displayTowers(subtitle) {

    const lines = [];
    for (let i = 1; true; i++) {
      let newLine = this.towers.reduce((acc, cur) => {
        const lastElement = cur[cur.length - i];
        if (lastElement === undefined) {
          return `${acc}  `;
        }
        return `${acc} ${lastElement}`;
      }, '');
      if (newLine.trim() === '') {
        break;
      }
      lines.push(newLine);
    }
    let output = lines.reduceRight((acc, cur) => {
      return acc + '\n' + cur
    },'');
    const underscore =' ' + '-'.repeat(this.towers.length * 2 - 1);
    const numbers = Array.from(this.towers.keys())
      .reduce((acc, cur) => acc + ' ' + cur);

    output = output + '\n'
      + underscore + '\n '
      + numbers + '\n'
      + subtitle + '\n\n';

    console.log(output);
  }
}


module.exports.TowerService = TowerService;
