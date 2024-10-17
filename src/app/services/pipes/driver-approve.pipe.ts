import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "membership",
})
export class MembershipType implements PipeTransform {
  transform(value: any) {
    switch (value) {
      case 420:
        return "Free";
      case 421:
        return "Pro";
      case 422:
        return "Bussiness";
      default:
        return "Free";
    }
  }
}
