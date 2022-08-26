import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

// Our CatsService is a basic class with one property and two methods.
// The only new feature is that it uses the @Injectable() decorator.
// The @Injectable() decorator attaches metadata, which declares that CatsService is a class that can be managed by the Nest IoC container.
//  By the way, this example also uses a Cat interface。

// TS的写法
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];
  create(cat: Cat) {
    console.log('1')
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}


// JS的写法：
// @Injectable()
// export class CatsService {
//   constructor() {
//     this.cats = [];
//   }

//   create(cat) {
//     this.cats.push(cat);
//   }

//   findAll() {
//     return this.cats;
//   }
// }