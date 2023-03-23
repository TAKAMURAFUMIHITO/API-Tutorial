import { AppDataSource } from "../data-source";
import { User } from "../model/User";

const userRepository = AppDataSource.getRepository(User);

export default class BookRepository {
  // すでに登録されているメールアドレスか確認
  async findByEmail(email: string) {
    return await userRepository.findOneBy({
      email: email,
    });
  }

  // ユーザーidでユーザーが登録されているか確認
  async findById(id: number) {
    const user = await userRepository.findOneBy({
      id: id,
    });
    return user;
  }

  // ユーザーの登録(パスワードは暗号化)
  async create(user: User, hashedPassword: string) {
    await userRepository.save({
      ...user,
      password: hashedPassword,
    });
  }

  // 特定のユーザーを更新
  async update(user: User) {
    await userRepository.save(user);
  }

  // 特定のユーザーを削除
  async delete(userId: number) {
    await userRepository.delete(userId);
  }
}