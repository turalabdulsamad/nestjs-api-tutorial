import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { GetUser } from "./../../src/auth/decorator";
import { JwtGuard } from "./../../src/auth/guard";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDto, EditBookmarkDto } from "./dto";

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookService: BookmarkService) {
    }

    @Post()
    createBookmark(@GetUser('id') userId: number, @Body() dto: CreateBookmarkDto) {
        return this.bookService.createBookmark(userId, dto)
    }

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarkById(@GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookService.getBookmarkById(userId, bookmarkId);
    }

    @Patch(':id')
    editBookmarkById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) bookmarkId: number
        , @Body() dto: EditBookmarkDto) {
        return this.bookService.editBookmarkById(
            userId,
            bookmarkId,
            dto
            );
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarkById(@GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number) {
        return this.bookService.deleteBookmarkById(
            userId,
            bookmarkId
        );
    }
}