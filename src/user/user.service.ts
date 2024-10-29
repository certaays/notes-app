import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { hash } from 'bcrypt'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService){}
  
  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.findByEmail(createUserDto.email)
    if (checkEmail){
      throw new ConflictException("Email is Exist")
    } 

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await hash(createUserDto.password, 10)
      }
    })

    const {password, ...user} = newUser
    return user
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where:{
        id, 
      }
    })
    
    if(user){
      const {password, ...data} = user
      return data
    }

    throw new NotFoundException("Data is not Exist")
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where:{
        email, 
      }
    })
    
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
