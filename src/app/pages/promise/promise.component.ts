import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  styleUrls: ['./promise.component.css']
})
export class PromiseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then( users => console.log(users) );
    // const promise = new Promise((resolve, reject) => {

    //   if (false) {
    //     resolve('hi world');
    //   } else {
    //     reject('something wrong')
    //   }

    // });
    // promise.then((message) => {
    //   console.log(message)
    // })
    //   .catch(error => console.log('Error', error));

    // console.log('end init')
  }

  getUsers() {

    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => resolve(body.data));
    });
    }

}
