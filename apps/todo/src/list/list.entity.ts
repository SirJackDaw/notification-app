import { AbstractEntity } from "libs/common";
import { Column, CreateDateColumn, Entity, OneToMany } from "typeorm";
import { Item } from "../item/item.entity";

@Entity()
export class List extends AbstractEntity<List> {
    @Column({ nullable: true, name: 'list_name' })
    listName: string;

    @Column({name: 'user_id'})
    userId: string;

    @Column({ nullable: true })
    deadline: Date;

    @Column({ default: false })
    done: boolean;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Item, (item) => item.list)
    items: Item[]
}