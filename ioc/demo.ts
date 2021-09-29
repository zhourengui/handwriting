import { controller, inject, injectable } from "./code";

const otherServiceKey = Symbol.for("otherService");

@injectable(otherServiceKey)
class OtherService {
  private name = "otherService";
}

@controller
class OtherController {
  constructor(@inject(otherServiceKey) private otherService?: OtherService) {}

  public handleSend() {
    console.log(this.otherService);
  }
}

const c = new OtherController();
c.handleSend();
