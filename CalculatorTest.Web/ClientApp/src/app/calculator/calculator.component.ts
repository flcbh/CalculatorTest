import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Model } from '../model/calculator-view-model';
import { Service } from "../services/calculator.service";
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'ng-calculator',
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent {

  model = {} as Model;

  input: string = '';
  result: string = '';

  constructor(private Service: Service, private builder: FormBuilder) { }



  pressNum(num: string) {

    //Do Not Allow . more than once
    if (num == ".") {
      if (this.input != "") {

        const lastNum = this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }

    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num == "0") {
      if (this.input == "") {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+') {
        return;
      }
    }

    this.input = this.input + num
    this.calcAnswer();
  }


  getLastOperand() {
    let pos: number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos = this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos = this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos = this.input.lastIndexOf("/")
    console.log('Last ' + this.input.substr(pos + 1))
    return this.input.substr(pos + 1)
  }


  pressOperator(op: string) {

    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
      return;
    }

    this.input = this.input + op
    this.calcAnswer();
  }


  clear() {
    if (this.input != "") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  allClear() {
    this.result = '';
    this.input = '';
    this.model.operation = '';
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.') {
      formula = formula.substr(0, formula.length - 1);
      this.model.operation = lastKey;
    }

    console.log("Formula " + formula);

    var index = formula.indexOf(this.model.operation);
    var lengh = formula.length;

    if (index > 0) {
      this.model.value1 = +formula.substring(0, index);
      this.model.value2 = +formula.substring(index + 1, lengh);
    }

      //this.result = eval(formula);
  }

  onSubmit(form: NgForm) {
    if (this.model.value1 !== undefined && this.model.value2 !== undefined) {
      this.Service.Calculate(this.model).subscribe(data => {
        this.result = data.result.toString();
        this.input = '';
        console.log("Result", data)
      },
        error => {
          console.log(error);
        }
      );
    }
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.allClear();
  }


  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input == "0") this.input = "";
  }

}
