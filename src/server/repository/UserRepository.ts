import { BaseRepository } from 'firestore-storage';
import { UsersCollection } from './collections';
import { User } from '@/types/User';
import { firebaseAdmin } from '../firbaseAdmin';
import { Repository } from 'firestore-storage-core';
import { log } from '../utils/log';

@Repository({ path: UsersCollection })
export class UsersRepository extends BaseRepository<User, typeof UsersCollection> {
    async getOrCreateUserInfo(userRecord: firebaseAdmin.auth.UserRecord): Promise<User> {
        try {
            const user: User = await this.getById({ id: userRecord.uid });
            log(`Returning existing user ${user.displayName}`);
            return user;
        } catch(error) {
            const userEmail = userRecord.email!; // is defined
            const newUser: User = {
                id: userRecord.uid,
                displayName: userRecord.displayName ?? userEmail,
                name: userRecord.displayName ?? userEmail,
                email: userEmail,
                avatarUrl: userRecord.photoURL,
                userRoles: [
                    'player'
                ],
                _rawPath: ''
            };
            log(`Creating new user ${newUser.displayName}`);
            await this.save(newUser);
            return newUser;
        }
    }

}

export const usersRepository: UsersRepository = new UsersRepository(firebaseAdmin.firestore());