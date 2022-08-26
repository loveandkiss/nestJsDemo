import { Controller, Get, Post, Put, Delete, Res, Req, Param, Query, Body, HttpCode, HttpStatus } from '@nestjs/common';

// Nest provides access to the request object of the underlying platform (Express by default).
// The request object represents the HTTP request and has properties for the request query string, parameters, HTTP headers, and body (read more here).
import { Request, Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

//  Using a path prefix in a @Controller() decorator allows us to easily group a set of related routes, and minimize repetitive code.
@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {}

  @Get('test01')
  test01(@Req() request: Request): string {
    console.log('test01', request.query)
    return 'test01';
  }

  // Routes with static paths won't work when you need to accept dynamic data as part of the request (e.g., GET /cats/1 to get cat with id 1).
  // In order to define routes with parameters, we can add route parameter tokens in the path of the route to capture the dynamic value at that position in the request URL.
  // The route parameter token in the @Get() decorator example below demonstrates this usage.
  // Route parameters declared in this way can be accessed using the @Param() decorator, which should be added to the method signature.
  // @Param() is used to decorate a method parameter (params in the example above), and makes the route parameters available as properties of that decorated method parameter inside the body of the method.
  // As seen in the code above, we can access the id parameter by referencing params.id.
  @Get('test02/:id')
  test02(@Param() param): string {
    console.log('test02', param)
    return 'param=>:';
  }

  // You can also pass in a particular parameter token to the decorator, and then reference the route parameter directly by name in the method body.
  @Get('test03/:id')
  test03(@Param('id') id: string): string {
    console.log('test03', id)
    return `id=>:${id}`;
  }

  @Get('test04')
  test04(@Query() query): string {
    console.log('test04', query)
    return 'test04';
  }


  // Request payloads
  // Our previous example of the POST route handler didn't accept any client params.
  // Let's fix this by adding the @Body() decorator here.
  // But first (if you use TypeScript), we need to determine the DTO (Data Transfer Object) schema.
  // A DTO is an object that defines how the data will be sent over the network.
  // We could determine the DTO schema by using TypeScript interfaces, or by simple classes.
  // Interestingly, we recommend using classes here.
  //  here. Why? Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript.
  // On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime.
  @Post('create')
  @HttpCode(200)
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('createCatDto=> ', createCatDto)
    // return 'This action adds a new cat';
    await this.catsService.create(createCatDto);
    console.log('2')
    return {
      code: 200,
      message: 'success'
    }
  }

  // full resource sample
  @Get('findAll')
  async findAll(): Promise<Cat[]>  {
    return this.catsService.findAll();
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    console.log('updateCatDto=> ', updateCatDto)
    return `This action updates a #${id} cat`;
  }

  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }

  // Status Code
  // As mentioned, the response status code is always 200 by default, except for POST requests which are 201.
  // We can easily change this behavior by adding the @HttpCode(...) decorator at a handler level.
  // Often, your status code isn't static but depends on various factors.
  // In that case, you can use a library-specific response (inject using @Res()) object (or, in case of an error, throw an exception).



  // Headers
  // To specify a custom response header, you can either use a @Header() decorator or a library-specific response object (and call res.header() directly).


  // Redirection



  // libarary-specific approach
  // So far we've discussed the Nest standard way of manipulating responses.
  // The second way of manipulating the response is to use a library-specific response object.
  //  In order to inject a particular response object, we need to use the @Res() decorator.
  @Post('create01')
  create01(@Res() res: Response) {
    // console.log('HttpStatus.CREATED', HttpStatus.CREATED) // 201
    // console.log('HttpStatus.OK', HttpStatus.OK) // 200
    // console.log('HttpStatus.INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR) // 500
    // console.log('HttpStatus', HttpStatus)
    res.status(HttpStatus.OK).send('kkkkkkkkk'); // 200
  }


  @Get('test05')
  test05(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]); // 200
  }


  // Dependency injection
  // Nest is built around the strong design pattern commonly known as Dependency injection.
  // We recommend reading a great article about this concept in the official Angular documentation.

}
