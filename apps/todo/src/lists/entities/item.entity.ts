import { AbstractEntity } from "libs/common";
import { Column, Entity, ManyToOne } from "typeorm";
import { List } from "./list.entity";

@Entity()
export class Item extends AbstractEntity<Item> {
    @Column()
    text: string;

    @Column({default: false})
    done: boolean;

    @ManyToOne(() => List, (list) => list.items, {onDelete: 'CASCADE'})
    list: List
}