
import {Entity} from "typeorm";
import {PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class EntityBase {
    //Id:number;

    constructor() {
        this.Id = 0;
    }
  
    @PrimaryGeneratedColumn({name:'id'})
    Id: number;

}