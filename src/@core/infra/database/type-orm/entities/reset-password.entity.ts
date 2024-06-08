import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from "./user.entity";
import { ResetPasswordStatus } from "../../../../domain/enum/reset-password-status.enum";

@Entity('reset_password')
export class ResetPasswordEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.resetPasswords)
    user: UserEntity;

    @Column({ type: 'enum', enum: ResetPasswordStatus, default: ResetPasswordStatus.active })
    status: ResetPasswordStatus;

    @Column({ type: 'timestamptz', nullable: false })
    expiresAt: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;

}
