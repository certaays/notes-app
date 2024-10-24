import { Controller, Get } from "@nestjs/common";

@Controller("notes")
export class NotesController {
    @Get()
    content(){
        return "notes content"
    }
}