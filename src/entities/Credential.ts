import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm/browser'

@Entity('credential')
export default class Credential {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  issuerCif: string

  @Column('text')
  issuerName: string

  @Column('text')
  issuerDid: string

  @Column('text')
  created: string

  @Column('text')
  key: string

  @Column('text')
  value: string

  @Column('text')
  data: string
}
