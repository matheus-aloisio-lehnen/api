import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from "./user.entity";


@Entity('logs')
export class LogEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ type: 'text', nullable: true })
    userAgent: string;

    @Column({ type: 'text', nullable: true })
    method: string;

    @Column({ type: 'text', nullable: true })
    endpoint: string;

    @Column({ type: 'text', nullable: true })
    payload: string;

    @Column({ type: 'text', nullable: true })
    context: string;

    @Column({ type: 'text', nullable: true })
    actionType: string;

    @Column({ type: 'text', nullable: true })
    message: string;

    @Column({ type: 'text', nullable: true })
    statusCode: number;

    @ManyToOne(() => UserEntity)
    user: UserEntity;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;


}
