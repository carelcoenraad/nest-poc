import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiImplicitParam,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@ApiUseTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ description: 'Ok', type: [User] })
  public async retrieveUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Created' })
  // TODO: Add created location header
  public async createUser(@Body() user: User): Promise<void> {
    await this.userService.create(user);
    return null;
  }

  @Get(':userId')
  @ApiImplicitParam({ name: 'userId' })
  @ApiOkResponse({ description: 'Ok', type: User })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async retrieveUser(@Param('userId') userId: User['id']): Promise<User> {
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new HttpException(`Could not retrieve user with id ${userId}`, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Put(':userId')
  @ApiImplicitParam({ name: 'userId' })
  @ApiOkResponse({ description: 'Ok' })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async updateUser(@Param('userId') userId: User['id'], @Body() user: User): Promise<void> {
    // Ensure that the user's id is the one from the path param and not from the body
    user.id = userId;
    const updateResult = await this.userService.updateUser(userId, user);

    if (!updateResult) {
      throw new HttpException(`Could not update user with id ${userId}`, HttpStatus.NOT_FOUND);
    }

    return null;
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiImplicitParam({ name: 'userId' })
  @ApiResponse({ description: 'Deleted', status: HttpStatus.NO_CONTENT })
  @ApiResponse({ description: 'Gone', status: HttpStatus.GONE })
  public async deleteUser(@Param('userId') userId: User['id']): Promise<void> {
    const user = await this.userService.deleteUser(userId);

    if (!user) {
      throw new HttpException(`Could not delete user with id ${userId}`, HttpStatus.GONE);
    }

    return null;
  }
}
