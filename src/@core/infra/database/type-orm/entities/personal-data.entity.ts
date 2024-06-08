import {
    Column,
    CreateDateColumn, DeleteDateColumn,
    Entity, JoinColumn, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { LegalStatus } from '../../../../domain/enum/legal-status.enum';
import { UserEntity } from "./user.entity";

@Entity('personal_data')
export class PersonalDataEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ length: 255, nullable: false })
    name: string;

    @Column({ nullable: false })
    documentNumber: string;

    @Column({ type: 'enum', enum: LegalStatus, default: LegalStatus.naturalPerson })
    legalStatus: LegalStatus;

    @Column({ nullable: false })
    mobile: string;

    @OneToOne(() => UserEntity, (userEntity) => userEntity.personalData)
    user: UserEntity;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;

}
