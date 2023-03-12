import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./user-authority.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;
    
    @Column()
    password: string;

    @OneToMany(()=>UserAuthority, userAuthority => userAuthority.user, {eager: true})
    authorities?: any[]
}