import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mensaje {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    nickname: string;

    @Column('text')
    message: string;
}
