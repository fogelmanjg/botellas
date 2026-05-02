import { Controller, Get, Post, Body } from "@nestjs/common";
import { DataService } from "./data.service";

@Controller("data")
export class DataController {
  constructor(private service: DataService) {}

  @Get("export")
  export() { return this.service.export(); }

  @Post("import")
  import(@Body() body: any) { return this.service.import(body); }
}
