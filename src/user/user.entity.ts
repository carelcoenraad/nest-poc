import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from '../types/Gender';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  public id: number;

  @Column()
  @IsString()
  @ApiModelProperty()
  public firstName: string;

  @Column()
  @IsString()
  @ApiModelProperty()
  public lastName: string;

  @Column({ nullable: true })
  @ApiModelProperty({
    enum: Gender,
    required: false,
  })
  @IsOptional()
  @IsEnum(Gender)
  public gender: Gender;

  @Column()
  @IsEmail()
  @ApiModelProperty()
  public email: string;
}
