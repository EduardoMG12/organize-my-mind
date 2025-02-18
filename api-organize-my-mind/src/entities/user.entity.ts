import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn, DeleteDateColumn} from "typeorm";
import { Item } from "./item.entity";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    username: string;

    @Column({ length: 100 })
    fullName: string;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ default: false })
    isPublic: boolean;

    @Column({ nullable: true })
    bio: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    @OneToMany(() => Item, item => item.owner)
    items: Item[];

}
