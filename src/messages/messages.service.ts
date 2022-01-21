import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensaje } from 'src/entities/mensaje.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message-dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Mensaje)
        private readonly mensajeRepository: Repository<Mensaje>
    ){}

    async getAll(): Promise<Mensaje[]> {
        return await this.mensajeRepository.find();
    }

    async createMessage(newMessage: CreateMessageDto): Promise<Mensaje> {
        const newObject = new Mensaje();
        newObject.message = newMessage.message;
        newObject.nickname = newMessage.nickname;

        return this.mensajeRepository.save(newObject);
    }

    async updateMessage(idMessage: number, updatedMessage: CreateMessageDto): Promise<Mensaje> {
        const object = await this.mensajeRepository.findOne(idMessage);
        object.nickname = updatedMessage.nickname;
        object.message = updatedMessage.message;
        return this.mensajeRepository.save(object);
    }

    async deleteMessage(idMessage: number): Promise<any> {
        return this.mensajeRepository.delete(idMessage);
    }
}
