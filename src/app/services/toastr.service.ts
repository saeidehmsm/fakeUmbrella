import { Injectable } from "@angular/core";
import { ToastrManager } from "ng6-toastr-notifications";
import { positions, animates } from "../interfaces/enums";

@Injectable({
  providedIn: "root",
})
export class ToastrService {
  constructor(private toastr: ToastrManager) {}

  error = function (
    message: string,
    position: positions = positions.bottomRight,
    animate: animates = animates.slideFromBottom
  ) {
    this.toastr.errorToastr(message, "", {
      position: position,
      animate: animate,
    });
  };

  warning = function (
    message: string,
    position: positions = positions.bottomRight,
    animate: animates = animates.slideFromBottom
  ) {
    this.toastr.warningToastr(message, "", {
      position: position,
      animate: animate,
    });
  };

  success = function (
    message: string,
    position: positions = positions.bottomRight,
    animate: animates = animates.slideFromBottom
  ) {
    this.toastr.successToastr(message, "", {
      position: position,
      animate: animate,
    });
  };

  info = function (
    message: string,
    position: positions = positions.bottomRight,
    animate: animates = animates.slideFromBottom
  ) {
    this.toastr.infoToastr(message, "", {
      position: position,
      animate: animate,
    });
  };
}
