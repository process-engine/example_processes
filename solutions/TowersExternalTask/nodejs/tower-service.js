const {
  ExternalTaskFinished,
} = require('@process-engine/external_task_api_contracts');


class TowerService {

  constructor() {
    this.towers = [['A', 'B', 'C'], [], []];
    console.log('Started Tower \n'+ JSON.stringify(this.towers));
  }

  async takeElement(externalTask) {

    const fromIndex = externalTask.payload;
    const element = this.towers[fromIndex].pop();

    console.log('Taken one element of tower. The tower now looks like this.' + JSON.stringify(this.towers));
    return new ExternalTaskFinished(externalTask.id, element);
  }

  async putElement(externalTask) {

    const {element, toIndex} = externalTask.payload;
    this.towers[toIndex].push(element);
    console.log('Added one element. The tower now looks like this.' + JSON.stringify(this.towers));
    return new ExternalTaskFinished(externalTask.id);
  }

  async showTowers(externalTask) {
    console.log('Showing towers: ' + JSON.stringify(this.towers))
    return new ExternalTaskFinished(externalTask.id, JSON.stringify(this.towers));
  }


  async checkIfEmpty(externalTask) {

    const towerIndex = externalTask.payload;
    const towerIsEmpty = this.towers[towerIndex].length === 0;

    return new ExternalTaskFinished(externalTask.id, towerIsEmpty);
  }

  _displayTowers() {

    const lines = [];
    let i = 0;
    let thereAreMoreElements = this.towers.find((tower) => {
      return
    });
    while (thereAreMoreElements) {

      thereAreMoreElements = this.towers.find((tower) => {
        tower[i]
      });
    }
  }
}


module.exports.TowerService = TowerService;
