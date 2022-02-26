import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('companies')
export class Company extends BaseEntity {

    @Column({ type: 'varchar', length: 50, nullable: false })
    login: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    tocken: string;
} 