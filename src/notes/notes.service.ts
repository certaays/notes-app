import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Injectable()
export class NotesService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ){}

  async create(createNoteDto: CreateNoteDto, token: string) {
    const payload = await this.jwtService.decode(token)

    if(!payload){
      throw new Error('Invalid token')
    }

    const notes = await this.prisma.notes.create({
      data: {
        userId: payload.sub,
        ...createNoteDto
      }
    })

    return notes
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto) {
    const notes = await this.prisma.notes.update({
      where: {
        id,
      },
      data: {
        ...updateNoteDto
      }
    })

    return notes
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
