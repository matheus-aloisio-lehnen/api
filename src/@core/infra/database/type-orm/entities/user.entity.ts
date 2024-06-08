import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from "./address.entity";
import { AccountEntity } from "./account.entity";
import { PersonalDataEntity } from './personal-data.entity';
import { LogEntity } from "./log.entity";
import { Role } from "../../../../domain/enum/role.enum";
import { ResetPasswordEntity } from "./reset-password.entity";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id?: number;

    @Column({ length: 255, nullable: false })
    email: string;

    @Column({ length: 255, nullable: false })
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.wasteGenerator })
    role: Role;

    @Column({ default: true, nullable: false })
    status: boolean;

    @OneToOne(() => AccountEntity, (accountEntity: AccountEntity) => accountEntity.user, { cascade: true, eager: true } )
    @JoinColumn()
    account: Partial<AccountEntity>;

    @OneToOne(() => PersonalDataEntity, (personalDataEntity: PersonalDataEntity) => personalDataEntity.user, { cascade: true, eager: true } )
    @JoinColumn()
    personalData: Partial<PersonalDataEntity>;

    @OneToOne(() => AddressEntity, (addressEntity: AddressEntity) => addressEntity.user, { cascade: true, eager: true } )
    @JoinColumn()
    address: Partial<AddressEntity>;

    @OneToMany(() => LogEntity, (logsEntity: LogEntity) => logsEntity.user)
    logs: LogEntity[];

    @OneToMany(() => ResetPasswordEntity, (resetPasswords: ResetPasswordEntity) => resetPasswords.user)
    resetPasswords: ResetPasswordEntity[];

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    createdAt?: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;

}
