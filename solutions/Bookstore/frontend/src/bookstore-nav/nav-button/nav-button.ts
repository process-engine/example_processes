import {bindable} from 'aurelia-framework';

export class NavButton {

  @bindable public title: string;
  @bindable public toggleElementId: string;
  @bindable public show: boolean = false;


  private toggleElement: HTMLElement;



  public attached() {

    if (this.toggleElementId === undefined || this.toggleElementId === '') {
      return;
    }

    const toggleElement: HTMLElement | null = document.getElementById(this.toggleElementId);
    this.toggleElement = (toggleElement !== null) ? toggleElement : undefined;

    if (this.show === true) {
      this.showElement();
      return;
    }
    this.hideElement();
  }

  private hideElement(): void {

    this.toggleElement.style.display = 'none';
  }

  private showElement(): void {


    this.toggleElement.style.display = 'block';
    setTimeout(() => {
      const eventListener = (event: MouseEvent) => {
        // if event.target is child of toggleelement

        this.toggle();
        document.removeEventListener('click', eventListener);
      };

      document.addEventListener('click', eventListener);

    }, 100);
  }


  public showChanged(newValue: boolean): void {

    if (this.toggleElement === undefined) {
      return;
    }

    const toggleElement: HTMLElement = document.getElementById(this.toggleElementId);

    if (newValue === true) {

      this.showElement();


      return;
    }

    this.hideElement();
  }

  public toggle(): void {

    this.show = !this.show;
  }

}
