import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { UserEntity } from "./user.entity";

import { User } from "../../../../domain/model/user";

@Entity('address')
export class AddressEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    id: number;

    @Column({ nullable: false })
    zipCode: string;

    @Column({ nullable: false })
    street: string;

    @Column({ length: 100, nullable: false })
    number: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: false } )
    lat: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: false } )
    lng: number;

    @Column({ nullable: true })
    placeId: string;

    @OneToOne(() => UserEntity, (userEntity: UserEntity) => userEntity.address)
    user: User;

    @CreateDateColumn({ type: 'timestamptz', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', nullable: true })
    updatedAt?: Date;

    @DeleteDateColumn({ type: 'timestamptz', nullable: true })
    deletedAt?: Date;

}
