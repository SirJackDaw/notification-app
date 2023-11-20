import { AbstractEntity } from "libs/common";
import { Column, Entity, ManyToOne } from "typeorm";
import { List } from "../list/list.entity";

@Entity()
export class Item extends AbstractEntity<Item> {
    @Column()
    text: string;

    @Column()
    done: boolean;

    @ManyToOne(() => List, (list) => list.items)
    list: List
}