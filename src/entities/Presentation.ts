import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm/browser'

@Entity('presentation')
export default class Presentation {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  psmHash: string

  @Column('text')
  serviceProviderName: string

  @Column('text')
  serviceProviderCif: string

  @Column('text')
  serviceProviderDid: string

  @Column('text')
  created: string

  @Column('simple-array')
  credentialNames: string[]

  @Column('text')
  data: string

  @Column('text')
  cbu: string
}
