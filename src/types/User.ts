import { BaseModel } from "firestore-storage-core";

export interface User extends BaseModel {
    name: string;
    displayName: string;
    email: string;
    avatarUrl?: string;
    userRoles: UserRole[];
}

export type UserRole = 
    /**
     * Role to play the game
     */
    |'player'
    /**
     * Role to chat with other users
     */
    |'chat'
    /**
     * Role to administrate users and roles
     */
    |'admin';