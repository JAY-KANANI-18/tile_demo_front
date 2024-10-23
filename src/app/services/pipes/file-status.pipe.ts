import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "fileStatus",
})
export class FileStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 0:
        return "in queue";
      case 1:
        return "uploading";
      case 2:
        return "completed";
      case 4:
        return "skip";
      case 5:
        return "failed";
      default:
        return "failed";
    }
  }
}
