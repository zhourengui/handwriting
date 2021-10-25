import { fromEvent, debounceTime } from "rxjs";

fromEvent(document, "click")
  .pipe(debounceTime(1000))
  .subscribe(() => console.log("触发点击事件"));
