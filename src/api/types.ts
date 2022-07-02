export type APIError = {
  reason: string;
};

export type UserDataDTO = {
    id: number;
    avatar: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    email: string;
    phone: string;
};

export type CardDTO = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessageDTO;
};

export type LastMessageDTO = {
  user: UserDataDTO;
  time: Date;
  content: string;
};

export type ChatMessageDTO = {
  id: number;
  is_read: boolean;
  content: string;
  user_id: number;
  chat_id: number;
  time: Date;
};

export type ChangePasswordDataDTO = {
  oldPassword: string;
  newPassword: string;
};
