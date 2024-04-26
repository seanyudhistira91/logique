import { Injectable } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';
import { RegisterUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { DebitCard } from './models/debit-card.model';
import { Photo } from './models/photo.model';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize-typescript';
import { ListUserDto } from './dto/list-user.dto';
import { Op } from 'sequelize';
import { PatchUserDto } from './dto/patch-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(DebitCard) private readonly debitCardModel: typeof DebitCard,
    @InjectModel(Photo) private readonly photoModel: typeof Photo,
    private readonly sequelize: Sequelize,
  ) {}

  async create(registerData: RegisterUserDto): Promise<any> {
    const trx = await this.sequelize.transaction();
    try {
      const user = {
        name: registerData.name,
        address: registerData.address,
        email: registerData.email,
        password: await bcrypt.hash(registerData.password, 10),
      };

      const resUser = await this.userModel.create(user, { transaction: trx });
      const userId = resUser.dataValues.id;

      const debitCard = {
        userId,
        type: registerData.debitcard_type,
        number: registerData.debitcard_number,
        name: registerData.debitcard_name,
        expired: registerData.debitcard_expired,
        cvv: registerData.debitcard_cvv,
      };

      await this.debitCardModel.create(debitCard, { transaction: trx });

      const transformedPhoto = registerData.photos.map((url) => {
        return { userId, url };
      });

      await this.photoModel.bulkCreate(transformedPhoto, { transaction: trx });

      await trx.commit();
      return {
        user_id: userId,
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }

  async findAll(query: ListUserDto): Promise<any> {
    const search = query.q ? query.q : '';
    const limit = query.lt ? parseInt(query.lt) : 30;
    const offset = query.of ? parseInt(query.of) : 0;
    const orderBy = query.ob ? query.ob : 'email';
    const sortBy = query.sb ? query.sb : 'desc';
    const modelInclude = [
      {
        model: Photo,
        as: 'photos',
        attributes: ['url'],
      },
      {
        model: DebitCard,
        as: 'debitcard',
        attributes: ['type', 'number', 'name', 'expired'],
      },
    ];

    const [data, total] = await Promise.all([
      this.userModel.findAll({
        where: {
          name: {
            [Op.iLike]: `%${search}%`,
          },
        },
        limit,
        offset,
        include: modelInclude,
        order: [[orderBy, sortBy]],
      }),
      this.userModel.count(),
    ]);

    const convertedUsers = data.map((user) => ({
      user_id: user.id,
      name: user.name,
      address: user.address,
      email: user.email,
      photos: user.dataValues.photos.map((photo) => photo.dataValues.url),
      debitcard: user.debitcard,
    }));

    return { count: total, rows: convertedUsers };
  }

  async findOne(id: string): Promise<any> {
    const modelInclude = [
      {
        model: Photo,
        as: 'photos',
        attributes: ['url'],
      },
      {
        model: DebitCard,
        as: 'debitcard',
        attributes: ['type', 'number', 'name', 'expired'],
      },
    ];

    const user = await this.userModel.findOne({
      where: {
        id,
      },
      include: modelInclude,
    });

    const res = {
      user_id: user.dataValues.id,
      name: user.dataValues.name,
      address: user.dataValues.address,
      email: user.dataValues.email,
      photos: user.dataValues.photos.map((photo) => photo.dataValues.url),
      debitcard: {
        type: user.dataValues.debitcard.type,
        number: user.dataValues.debitcard.number,
        name: user.dataValues.debitcard.name,
        expired: user.dataValues.debitcard.expired,
      },
    };
    return res;
  }

  async patch(data: PatchUserDto): Promise<any> {
    const trx = await this.sequelize.transaction();
    try {
      const user: any = {};
      if (data.name) user.name = data.name;
      if (data.address) user.address = data.address;
      if (data.email) user.email = data.email;
      if (data.password) user.password = await bcrypt.hash(data.password, 10);

      const [updatedRowsUser] = await User.update(user, {
        where: { id: data.user_id },
        transaction: trx,
      });

      const debitcard: any = {};
      if (data.debitcard_type) debitcard.type = data.debitcard_type;
      if (data.debitcard_number) debitcard.number = data.debitcard_number;
      if (data.debitcard_name) debitcard.name = data.debitcard_name;
      if (data.debitcard_expired) debitcard.expired = data.debitcard_expired;
      if (data.debitcard_cvv) debitcard.cvv = data.debitcard_cvv;

      const [updatedRowsCC] = await debitcard.update(debitcard, {
        where: { userId: data.user_id },
        transaction: trx,
      });

      if (data.photos && data.photos.length > 0) {
        await Photo.destroy({
          where: { userId: data.user_id },
          transaction: trx,
        });

        const transformedPhoto = data.photos.map((url) => {
          return { userId: data.user_id, url };
        });

        await this.photoModel.bulkCreate(transformedPhoto, {
          transaction: trx,
        });
      }

      await trx.commit();
      return {
        success: true,
      };
    } catch (error) {
      await trx.rollback();
      throw error;
    }
  }
}
