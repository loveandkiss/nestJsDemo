import { Request, Response } from 'express';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
export declare class CatsController {
    private catsService;
    constructor(catsService: CatsService);
    test01(request: Request): string;
    test02(param: any): string;
    test03(id: string): string;
    test04(query: any): string;
    create(createCatDto: CreateCatDto): Promise<{
        code: number;
        message: string;
    }>;
    findAll(): Promise<Cat[]>;
    findOne(id: string): string;
    update(id: string, updateCatDto: UpdateCatDto): string;
    remove(id: string): string;
    create01(res: Response): void;
    test05(res: Response): void;
}
