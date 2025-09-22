import { UserService } from '@/lib/services/user-service';
import { User } from '@/lib/types';

export class AuthService {
  static async authenticateUser(farcasterId: string, username?: string): Promise<User> {
    try {
      // Try to find existing user
      let user = await UserService.getUserByFarcasterId(farcasterId);

      if (!user) {
        // Create new user if doesn't exist
        user = await UserService.createUser({
          farcasterId,
          username: username || `user_${farcasterId}`,
          bio: '',
          skills: [],
          interests: [],
        });
      }

      return user;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  }

  static async getCurrentUser(farcasterId: string): Promise<User | null> {
    try {
      return await UserService.getUserByFarcasterId(farcasterId);
    } catch (error) {
      console.error('Error getting current user:', error);
      throw error;
    }
  }

  static async updateUserProfile(
    farcasterId: string,
    updates: Partial<{
      username: string;
      bio: string;
      skills: string[];
      interests: string[];
      walletAddress: string;
      avatar: string;
    }>
  ): Promise<User> {
    try {
      const user = await UserService.getUserByFarcasterId(farcasterId);
      if (!user) {
        throw new Error('User not found');
      }

      return await UserService.updateUser(user.userId, updates);
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
}

