class Action {
  constructor(public name: string, public nextAction: Action | null = null) {}

  setNextAction(action: Action) {
    this.nextAction = action;
  }

  handler() {
    console.log(`${this.name}处理`);
    this.nextAction?.handler();
  }
}

const teacher = new Action("teacher");
const grade = new Action("grade");
const headmaster = new Action("headmaster");

teacher.setNextAction(grade);
grade.setNextAction(headmaster);

teacher.handler();
