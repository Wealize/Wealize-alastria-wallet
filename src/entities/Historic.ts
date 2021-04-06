import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm/browser'

@Entity('historic')
export default class Historic {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  data: string

  @Column('text')
  datetime: string

  @Column('text')
  entity: string

  @Column('text')
  type: string
  
  @Column('text')
  infoType: string

  @Column('text')
  description: string
}