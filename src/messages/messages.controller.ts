import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { response } from 'express';
import { CreateMessageDto } from './dto/create-message-dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {

    constructor(private readonly messagesService: MessagesService){}

    @Post()
    create(@Body() createMessageDto: CreateMessageDto, @Res() response): void{
        this.messagesService.createMessage(createMessageDto).then( message => {
            response.status(HttpStatus.CREATED).json(message);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'Error en la creacion del mensaje'});
        });
    }

    @Get()
    getAll(@Res() response){
        this.messagesService.getAll().then(list => {
            response.status(HttpStatus.OK).json(list);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtencion de mensajes'})
        });
    }

    @Put(':id')
    update(@Body() updateMessageDto: CreateMessageDto, @Res() response, @Param('id') idMessage: number) {
        this.messagesService.updateMessage(idMessage,updateMessageDto).then( message => {
            response.status(HttpStatus.OK).json(message);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error al modificar el mensaje'})
        });
    }

    @Delete(':id')
    delete(@Body() deleteMessageEntity: CreateMessageDto, @Res() response, @Param('id') idMessage: number) {
        this.messagesService.deleteMessage(idMessage).then( res => {
            response.status(HttpStatus.OK).json(res);
        }).catch( () => {
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error al eliminar el mensaje'})
        });
    }
}
